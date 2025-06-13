import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { take, delay } from 'rxjs/operators';
// import WebSocketService from './webSocketService';
import ClientService from './clientService';
import { ActionStatus, Session } from '@/models';
import webSocketServices from './webSocketService';

class MusicService {
  private song: HTMLAudioElement = new Audio();
  private is_playing: ActionStatus = ActionStatus.Pause;
  private currentTrack: string = '';
  private trackDuration: number = 0;
  private trackDurationSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private position_timeSubject: Subject<number> = new Subject<number>();
  private static instance: MusicService;

  private constructor(
    private webSocketService = webSocketServices,
    private clientService = new ClientService()
  ) {}

  public static getInstance(): MusicService {
    if (!MusicService.instance) {
      MusicService.instance = new MusicService();
    }
    return MusicService.instance;
  }

  public getTrackDuration(): Observable<number> {
    return this.trackDurationSubject.asObservable();
  }

  public getposition_time(): Observable<number> {
    return this.position_timeSubject.asObservable();
  }

  public definitionis_playing(selectChatId: number, authUserId: number): void {
    this.webSocketService.getSessionData()
      .pipe(delay(100), take(10))
      .subscribe((sessionData: Session) => {
        console.log('Received session data:', sessionData);

        if (sessionData.is_playing === ActionStatus.Play) {
          this.playAudio(selectChatId, sessionData, authUserId);
          console.log('Playing track...');
        } else if (sessionData.is_playing === ActionStatus.Pause) {
          this.pauseAudio(selectChatId, sessionData, authUserId);
          console.log('Track paused.');
        }
      });
  }

  public async updateChatSession(
    selectChatId: number,
    command: ActionStatus,
    song_uuid: string,
    authUserId: number
  ): Promise<void> {
    const current_time = Date.now();
    this.is_playing = command;

    if (song_uuid !== this.currentTrack) {
      this.song.currentTime = 0;
    }

    const messageBody: Session = {
      position_time: this.song.currentTime,
      is_playing: this.is_playing,
      uuid: selectChatId,
      current_time,
      sender_uuid: authUserId,
      song_uuid,
    };

    try {
      const updatedSession = await this.clientService.updateSession(messageBody);
      this.webSocketService.sendGetSession(selectChatId);
      console.log('Updated session:', updatedSession);

      setTimeout(() => {
        this.definitionis_playing(selectChatId, authUserId);
      }, 100);
    } catch (error) {
      console.error('Error updating session:', error);
    }
  }

  private playAudio(selectChatId: number, session: Session, authUserId: number): void {
    console.log('playAudio');

    if (selectChatId === session.uuid) {
      this.currentTrack = session.song_uuid;
      this.song.src = session.song_uuid;

      this.song.onloadedmetadata = () => {
        this.trackDuration = Math.round(this.song.duration);
        this.trackDurationSubject.next(this.trackDuration);
      };

      if (session.position_time === this.trackDuration || !session) {
        session.position_time = 0;
      }

      if (authUserId === session.sender_uuid) {
        this.song.currentTime = session.position_time;
      } else {
        const current_timePlay = Date.now();
        this.song.currentTime = session.position_time + ((current_timePlay - session.current_time) / 1000);
      }

      this.song.ontimeupdate = () => {
        this.position_timeSubject.next(this.song.currentTime);
      };

      this.song.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
  }

  private pauseAudio(selectChatId: number, session: Session, authUserId: number): void {
    console.log('pauseAudio');
    
    if (selectChatId === session.uuid) {
      this.currentTrack = session.song_uuid;
      this.song.src = session.song_uuid;
      
      if (authUserId === session.sender_uuid) {
        this.song.currentTime = session.position_time;
        this.position_timeSubject.next(this.song.currentTime);
      } else {
        const current_timePause = Date.now();
        this.song.currentTime = session.position_time + ((current_timePause - session.current_time) / 1000);
      }
      
      this.song.pause();
    }
  }

  public setVolume(volumeValue: number): void {
    this.song.volume = volumeValue;
  }

  public seekAudio(seekTime: number, track: string, authUserId: number, selectChat: number): void {
    this.song.currentTime = seekTime;
    this.updateChatSession(selectChat, ActionStatus.Play, track, authUserId);
  }
}

export default MusicService.getInstance();