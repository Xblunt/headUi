import { Message } from '@/app/chats/page';
import { ActionStatus, Session, SubscriptionUser } from '@/models';
import { RxStomp } from '@stomp/rx-stomp';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';

class WebSocketService {
  private subscriptions: Subscription[] = [];
  private activeSubscriptions: SubscriptionUser[] = [];
  private sessionDataSubject: BehaviorSubject<Session>;
  private readonly stompClient: RxStomp;
  private static instance: WebSocketService;
  private messagesSubject = new BehaviorSubject<Message[]>([]);

  private constructor() {
    this.stompClient = new RxStomp();
    this.sessionDataSubject = new BehaviorSubject<Session>({
      uuid: 0,
      is_playing: ActionStatus.Pause,
      position_time: 0,
      current_time: 0,
      sender_uuid: 0,
      song_uuid: ''
    });
  }

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public getSessionData(): Observable<Session> {
    return this.sessionDataSubject.asObservable();
  }

  public sendGetSession(messageBody: number): void {
    this.stompClient.publish({ 
      destination: `/sinx/${messageBody}`, 
      body: JSON.stringify(messageBody) 
    });
    console.log('Sent message:', messageBody);
  }

   public subscribeToChatAndSession(chatId: number, userId: number, currentUserId: string): void {
    const sessionSubscription = this.stompClient.watch(`/session/${chatId}`).subscribe(message => {
      try {
        const data = JSON.parse(message.body);
        this.sessionDataSubject.next({
          uuid: data.uuid,
          is_playing: data.is_playing,
          position_time: data.position_time,
          current_time: data.current_time,
          sender_uuid: data.sender_uuid,
          song_uuid: data.song_uuid,
        });
      } catch (error) {
        console.error('Error parsing session message:', error);
      }
    });

    const chatSubscription = this.stompClient.watch(`/chats/${chatId}`).subscribe(message => {
      try {
        const newMessage: Message = JSON.parse(message.body);
        newMessage.isCurrentUser = newMessage.sender.uuid === currentUserId;
        
        this.messagesSubject.next([
          ...this.messagesSubject.value,
          newMessage
        ]);
      } catch (error) {
        console.error('Error parsing chat message:', error);
      }
    });

    this.subscriptions.push(sessionSubscription, chatSubscription);
    this.activeSubscriptions.push({
      chatId,
      userId,
      subscription: new Subscription(() => {
        sessionSubscription.unsubscribe();
        chatSubscription.unsubscribe();
      })
    });
  }

  public unsubscribeUser(chatId: number, userId: number): void {
    this.activeSubscriptions = this.activeSubscriptions.filter(sub => {
      if (sub.chatId === chatId && sub.userId === userId) {
        sub.subscription.unsubscribe();
        return false;
      }
      return true;
    });
  }

  public disconnectFromWebSocket(): void {
    this.stompClient.deactivate();
    setTimeout(() => {
      if (!this.stompClient.connected) {
        console.log('Disconnected from STOMP');
      }
    }, 1000);
  }

  public configure(webSocketConfig: any): void {
    this.stompClient.configure(webSocketConfig);
  }

  public activateWebSocket(): void {
    this.stompClient.activate();
  }

  public connectToWebSocket(): Promise<boolean> {
    this.activateWebSocket();
    
    return new Promise((resolve) => {
      const checkConnection = () => {
        if (!this.stompClient.connected) {
          console.log('Connected to STOMP');
          resolve(true);
        } else {
          setTimeout(checkConnection, 100);
        }
      };
      
      setTimeout(() => {
        if (!this.stompClient.connected) {
          console.error('Failed to connect to STOMP');
          resolve(false);
        }
      }, 5000);
      
      checkConnection();
    });
  }
}

export default WebSocketService.getInstance();