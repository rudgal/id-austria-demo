import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { JwtNavigatorComponent } from './components/jwt-navigator/jwt-navigator.component';
import { TreeNodeComponent } from './components/tree-node/tree-node.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    JwtNavigatorComponent,
    TreeNodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    ScrollPanelModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [JwtNavigatorComponent]
})
export class AppModule { } 