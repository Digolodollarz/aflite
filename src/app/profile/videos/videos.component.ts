import {Component, OnInit} from '@angular/core';
import {VideoPitch} from '../../shared/video-pitch';
import {VideoService} from './video.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  currentVideoSafeUrl: SafeResourceUrl;
  currentVideo: VideoPitch;
  newVideo: VideoPitch = new VideoPitch();

  constructor(private service: VideoService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.service.getMyVideo().subscribe(video => {
      this.currentVideo = video;
      this.currentVideoSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentVideo.fileUrl);
      console.log(this.currentVideoSafeUrl);
    });
  }

  setVideo() {
    // let url;
    const rx = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/;
    const ids = this.newVideo.fileUrl.match(rx);

    // this.newVideo.fileUrl = this.newVideo.fileUrl.replace('watch?v=', 'embed/')
    //   .substring(0, this.newVideo.fileUrl.indexOf('&') > 0 ? this.newVideo.fileUrl.indexOf('&') - 2 : this.newVideo.fileUrl.length);
    this.newVideo.fileUrl = `https://www.youtube.com/embed/${ids[1]}`;
    this.service.setMyVideo(this.newVideo).subscribe(_video => {
      this.currentVideo = _video;
      this.currentVideoSafeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.currentVideo.fileUrl);
    });
  }
}
