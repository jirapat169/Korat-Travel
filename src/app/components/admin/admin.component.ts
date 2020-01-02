import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "@angular/fire/storage";
import { finalize } from "rxjs/operators";
import { AngularFireDatabase } from "@angular/fire/database";

var self;
var _window: any = window;
var $ = _window.$;

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
  public formLocation: FormGroup;
  public lastImage: string = null;
  public travelLocation: Array<any> = [];
  public options: Object = {
    placeholderText: "Edit Your Content Here!",
    charCounterCount: false,
    events: {
      "image.beforeUpload": function(images: any) {
        const filePath = `image/${new Date().getTime()}`;
        const fileRef = self.storage.ref(filePath);
        const task: AngularFireUploadTask = fileRef.put(images[0]);
        task
          .snapshotChanges()
          .pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe(downloadURL => {
                self.lastImage = downloadURL;
                this.image.insert(downloadURL, null, null, this.image.get());
              });
            })
          )
          .subscribe();
        // var reader = new FileReader();
        // reader.readAsDataURL(images[0]);
        // reader.onload = e => {
        //   var result = e.target.result;
        //   this.image.insert(result, null, null, this.image.get());
        // };
        this.popups.hideAll();
        return false;
      },
      "image.beforeRemove": function(images: any) {
        self.lastImage = null;
        self.storage.storage.refFromURL(images[0].src).delete();
      }
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    public storage: AngularFireStorage,
    public afDB: AngularFireDatabase
  ) {
    self = this;
  }

  ngOnInit() {
    this.initialFormLocation();
    this.getLocation();
  }

  private getLocation = () => {
    this.afDB
      .list("/koratTravel")
      .snapshotChanges()
      .subscribe(value => {
        value = value.map((v: any) => {
          return { key: v.key, ...v.payload.val() };
        });
        this.travelLocation = value;
        console.log(this.travelLocation);
      });
  };

  public initialFormLocation = (data: any = null) => {
    this.formLocation = this.formBuilder.group({
      name: [data != null ? data.name : "", Validators.required],
      mark: [data != null ? data.mark : "", Validators.required],
      content: [data != null ? data.content : "", Validators.required]
    });
    this.lastImage = data != null ? data.lastImage : null;
  };

  public formLocationSubmit = () => {
    if (this.formLocation.valid) {
      if (this.lastImage != null) {
        this.formLocation.value.lastImage = this.lastImage;
        this.afDB
          .list("/koratTravel")
          .push(this.formLocation.value)
          .then(() => {
            console.log("Save Success");
            alert("บันทึกข้อมูลสำเร็จ");
            $("#exampleManageLocation").modal("hide");
          })
          .catch(() => {
            console.log("Save Error");
            alert("บันทึกข้อมูลผิดพาด");
          });
      } else {
        alert("โปรดใส่รูปภาพในเนื้อหาอย่างน้อย 1 รูป");
      }
    } else {
      alert("โปรดกรอกข้อมูลให้ครบถ้วน");
    }
  };
}
