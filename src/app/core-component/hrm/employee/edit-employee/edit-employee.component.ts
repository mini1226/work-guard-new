import { Component } from '@angular/core';
import { SidebarService, routes } from 'src/app/core/core.index';
interface data {
  value: string;
}
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent {
  public routes = routes;
  public selectedValue1 = '';
  public selectedValue2 = '';
  public selectedValue3 = '';
  public selectedValue4 = '';
  public selectedValue5 = '';
  public selectedValue6 = '';
  public selectedValue7 = '';
  public password: boolean[] = [false];

  selectedList1: data[] = [{ value: 'Male' }, { value: 'Female' }];
  selectedList2: data[] = [{ value: 'United Kingdom' }, { value: 'India' }];
  selectedList3: data[] = [{ value: 'Regular' }];
  selectedList4: data[] = [
    { value: 'UI/UX' },
    { value: 'Support' },
    { value: 'HR' },
    { value: 'Engineering' },
  ];
  selectedList5: data[] = [
    { value: 'Designer' },
    { value: 'Developer' },
    { value: 'Tester' },
  ];
  selectedList6: data[] = [
    { value: 'O positive' },
    { value: 'A positive' },
    { value: 'B positive' },
  ];
  selectedList7: data[] = [{ value: 'United Kingdom' }, { value: 'USA' }];

  public togglePassword(index: any) {
    this.password[index] = !this.password[index];
  }
  isCollapsed: boolean = false;
  toggleCollapse() {
    this.sidebar.toggleCollapse();
    this.isCollapsed = !this.isCollapsed;
  }
  constructor(private sidebar: SidebarService) {}
}
