import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DECODABLE_ATTRIBUTES } from '../../util/decodable-attributes';

@Component({
  selector: 'app-tree-node',
  templateUrl: './tree-node.component.html',
  styleUrls: ['./tree-node.component.scss'],
  providers: [MessageService]
})
export class TreeNodeComponent implements OnInit {
  @Input() label: string;
  @Input() value: any;
  @Input() expand: boolean = true;
  @Input() depth: number = 0;

  isExpanded: boolean;
  isDecoded: boolean;
  isTruncated: boolean = true;
  decodedValue: any;
  hasDecodableAttribute: boolean;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.isExpanded = this.expand;
    this.isDecoded = true;
    this.hasDecodableAttribute = !!DECODABLE_ATTRIBUTES[this.label];
    this.decodedValue = this.hasDecodableAttribute ? DECODABLE_ATTRIBUTES[this.label](this.value) : this.value;
  }

  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }

  toggleDecoded() {
    this.isDecoded = !this.isDecoded;
    this.decodedValue = this.isDecoded ? DECODABLE_ATTRIBUTES[this.label](this.value) : this.value;
  }

  toggleTruncated() {
    this.isTruncated = !this.isTruncated;
  }

  copyToClipboard() {
    navigator.clipboard.writeText(String(this.decodedValue)).then(() => {
      this.messageService.add({ severity: 'success', summary: 'Copied', detail: 'Copied to clipboard' });
    }).catch(err => {
      console.error('Failed to copy!', err);
    });
  }
} 