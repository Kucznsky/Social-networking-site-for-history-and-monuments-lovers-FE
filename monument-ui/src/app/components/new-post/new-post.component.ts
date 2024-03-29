import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, ImageType, Steps } from 'src/app/enums';
import { Localisation } from 'src/app/models';
import { JwtService } from 'src/app/services/jwt.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
})
export class NewPostComponent {
  public activeStep = Steps.AddDescription;
  public steps = Steps;
  public imageTypes = ImageType;
  public categories = Category;
  public selectedOption = Category.Other;
  public thumbnail: File[] = [];
  public modernImages: File[] = [];
  public oldImages: File[] = [];

  public areMultiplePicturesFeatureEnabled = false;

  constructor(
    private readonly postService: PostService,
    private readonly jwtService: JwtService,
  ) {}

  public newPostFormGroup: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    category: new FormControl<Category>(Category.Other, [Validators.required]),
    localisation: new FormControl<Localisation>(null, [Validators.required]),
    thumbnail: new FormControl<File>(null, [Validators.required]),
    oldPictures: new FormControl<File[]>([]),
    modernPictures: new FormControl<File[]>([]),
  });

  public createPost(): void {
    this.newPostFormGroup.controls['thumbnail'].setValue(this.thumbnail[0]);
    const userId = this.jwtService.getLoggedUsersId();
    if (this.newPostFormGroup.valid) {
      this.postService.createPost(
        this.newPostFormGroup.controls['thumbnail'].getRawValue(),
        this.newPostFormGroup.controls['title'].getRawValue(),
        this.newPostFormGroup.controls['description'].getRawValue(),
        this.newPostFormGroup.controls['category'].getRawValue(),
        this.newPostFormGroup.controls['localisation'].getRawValue(),
        userId,
      );
    }
  }

  public nextStep(activeStep: Steps): void {
    switch (activeStep) {
      case Steps.AddDescription:
        this.activeStep = Steps.AddLocalisation;
        break;
      case Steps.AddLocalisation:
        this.activeStep = Steps.AddImages;
        break;
      case Steps.AddImages:
        this.createPost();
        break;
    }
  }

  public previousStep(activeStep: Steps): void {
    switch (activeStep) {
      case Steps.AddImages:
        this.activeStep = Steps.AddLocalisation;
        break;
      case Steps.AddLocalisation:
        this.activeStep = Steps.AddDescription;
        break;
    }
  }

  public getBtnLabel(): string {
    return this.activeStep === Steps.AddImages ? 'Create Post' : 'Next Step';
  }

  public onSelect(event, imageType: ImageType) {
    switch (imageType) {
      case ImageType.Thumbnail:
        this.thumbnail.push(...event.addedFiles);
        break;
      case ImageType.Modern:
        this.modernImages.push(...event.addedFiles);
        break;
      case ImageType.Old:
        this.oldImages.push(...event.addedFiles);
        break;
    }
  }

  public onRemove(event, imageType: ImageType) {
    switch (imageType) {
      case ImageType.Thumbnail:
        this.thumbnail.splice(this.thumbnail.indexOf(event), 1);
        break;
      case ImageType.Modern:
        this.modernImages.splice(this.modernImages.indexOf(event), 1);
        break;
      case ImageType.Old:
        this.oldImages.splice(this.oldImages.indexOf(event), 1);
        break;
    }
  }

  public setLocalisation(localisation: Localisation): void {
    this.newPostFormGroup.controls['localisation'].setValue(localisation);
  }
}
