import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

// interface SearchParm {
//   keywords: string;
//   limit?: number;
//   offset?: number;
//   type?: number;
// }

interface Result {
  code: number;
  result: {
    songs: {
      id: number;
      name: string;
      duration: number;
      artists: {
        id: number;
        name: string;
      }[];
      album: {
        id: number;
        name: string;
      };
    }[];
    songCount: number;
  };
}

export interface Song {
  id: number;
  name: string;
  artist: string;
  album: string;
  duration: number;
}

export interface Songs {
  songCount: number;
  songs: Song[];
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  search(params): Observable<Songs> {
    return this.http.get<Result>('/search', { params }).pipe(
      map<Result, Songs>(v => {
        const songs = v.result.songs.map(song => ({
          id: song.id,
          name: song.name,
          duration: song.duration,
          artist: song.artists.map(s => s.name).join('/'),
          album: song.album.name
        }));

        return {
          songs,
          songCount: v.result.songCount
        };
      })
    );
  }
}
