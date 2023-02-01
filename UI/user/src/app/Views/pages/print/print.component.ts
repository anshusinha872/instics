import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const select_menu = document.getElementById('select-menu');
    const select_btn = document.getElementById('select-btn');
    const select_list = document.getElementById('select-list');
    const selectBtnText = document.getElementsByClassName('selectBtnText');
    const options = document.querySelectorAll('.option');
    const select_item = document.querySelectorAll('.select-item');
    // console.log(options);
    // console.log(selectBtnText[0].innerHTML);
    select_btn.addEventListener('click', () => {
      select_list.classList.toggle('active');
      // console.log(select_list.classList);
      const icon = document.getElementsByClassName('btn-icon');
      if (select_list.classList.contains('active')) {
        icon[0].classList.remove('fa-chevron-down');
        icon[0].classList.add('fa-chevron-up');
      }
      else {
        icon[0].classList.remove('fa-chevron-up');
        icon[0].classList.add('fa-chevron-down');
      }
    });
    options.forEach((option) => {
      option.addEventListener('click', () => {
        // console.log(option.innerHTML);
        const selectedText = option.innerHTML;
        selectBtnText[0].innerHTML = selectedText;
        select_list.classList.remove('active');
        const icon = document.getElementsByClassName('btn-icon');
        icon[0].classList.remove('fa-chevron-up');
        icon[0].classList.add('fa-chevron-down');
        
      });
    });
  }

}
