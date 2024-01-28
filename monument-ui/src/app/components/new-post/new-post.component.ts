import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, Steps } from 'src/app/enums';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostComponent {
  public activeStep = Steps.AddDescription
  public steps = Steps
  public categories = Category;
  public selectedOption = Category.Other;

  constructor(
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {}

  public newPostFormGroup: FormGroup = new FormGroup({
    title: new FormControl<string>('', [Validators.required]),
    description: new FormControl<string>('', [Validators.required]),
    category: new FormControl<Category>(Category.Other, [
      Validators.required,
    ]),
    location: new FormControl<string>('', [Validators.required]),
    thumbnail: new FormControl<File>(null,[Validators.required]),
    oldPictures: new FormControl<File[]>([]),
    modernPictures: new FormControl<File[]>([])
  });

  public createPost(): void {
    if (this.newPostFormGroup.valid) {
      this.router.navigate(['/home'])
    }    
  }

  public nextStep(activeStep: Steps): void {
    switch(activeStep){
      case Steps.AddDescription:
        this.activeStep = Steps.AddLocalisation
        break;
      case Steps.AddLocalisation:
        this.activeStep = Steps.AddImages
        break;
        case Steps.AddImages:
          this.createPost()
          break;
    }
  }

  public previousStep(activeStep: Steps): void {
    switch(activeStep){
      case Steps.AddImages:
        this.activeStep = Steps.AddLocalisation
        break;
      case Steps.AddLocalisation:
        this.activeStep = Steps.AddDescription
        break;
    }
  }

  public getBtnLabel(): string {
    return this.activeStep === Steps.AddImages ? 'Create Post' : 'Next Step'
  }

  files: File[] = [];

	public onSelect(event) {
		console.log(event);
		this.files.push(...event.addedFiles);
	}

	public onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
}
