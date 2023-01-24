import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { LoginService } from 'src/app/services/login/login.service';
interface DocImage {
  profileImage?: File;
}
@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
})
export class DemoComponent implements OnInit {
  imageDoc: DocImage;
  files: FileList;
  image = [];
  constructor(private toastr: ToastrManager,
  private loginService:LoginService) { }

  ngOnInit(): void {
    this.imageDoc = {};
  }
  onFileChange(event) {
    this.files = event.target.files;
    console.log(this.files);
    var pattern = /image-*/;
    if (this.files && this.files.length) {
      const file = this.files.item(0);
      if (file.size / (1024 * 1024) > 5) {
        this.toastr.errorToastr(
          'Uploaded image should not be more than 5mb...'
        );
        return;
      }
      if (!file.type.match(pattern)) {
        this.toastr.errorToastr('Invalid image format...');
        return;
      }
      this.imageDoc.profileImage = file;
    }
  }
  upload() {
    let req = new FormData();
    req.append("profileImage", this.imageDoc.profileImage);
    this.loginService.uploadImage(req).subscribe((res) => {
      console.log('res'+res);
    });
  }
  show() {
    this.loginService.showImage().subscribe((res) => {
      this.image = res['data']['data'];
      console.log(this.image);
    });
  }
}
