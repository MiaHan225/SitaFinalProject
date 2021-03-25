import { Component, OnInit, ViewChild } from '@angular/core';
import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../user';
import { UserService } from '../user.service';
import { LoginService } from '../login.service';
import { RegisterService } from '../register.service';

import { MaterialModule } from '../material/material.module';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs/operators';

import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['uid', 'firstname', 'lastname','phone', 'password', 'action'];
  dataSource!: MatTableDataSource<User>;
  users: User[] = [];


  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private register: RegisterService,
    public dialog: MatDialog) { 
    //this.userService.getUsers
    //().then(this.onPromiseSuccess, this.onPromiseError);
  }
  
 
 

  // onPromiseSuccess = (response: any) => {
  //   this.users = response;
  //   console.log(response);
  //   console.log(this.users);
  //   }

  // onPromiseError = () => {
  //   alert("error");
  //   }

  // onDeleteClick(n: any) {
  //   if (confirm("Are you sure to delete this employee?")) {
  //       this.users.splice(n, 1);
  //   }
  // }
 
  ngOnInit(): void{
    this.userService.getUsers
    ().then(this.onPromiseSuccess, this.onPromiseError);
  }

  onPromiseSuccess = (response: any) => {
    for (let i =0; i<response.length; i++){
      if (response[i].status=="active"){
        this.users.push(response[i]);
      }
    }
    // this.users = response;
    this.dataSource = new MatTableDataSource(this.users);
    // Assign the paginator *after* dataSource is set
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onPromiseError = () => {
    alert("error");
  }

  openDialog(action:any,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addRowData(row_obj: any){
    row_obj.status="active";
    this.register.register(row_obj)
    .subscribe(
      (res: any) => {
        console.log(res);
        if (res.status=="error") {
          alert(res.message)
        } 
      },
      () => { console.log('error in post process'); }
    ) 
    this.dataSource.data.push({
      username:row_obj.email,
      firstname:row_obj.firstname,
      lastname:row_obj.lastname,
      email:row_obj.email,
      password:row_obj.password,
      phone:row_obj.phone,
      gender:row_obj.gender,
      dob:row_obj.dob,
      status:'active'
    });
    this.table.renderRows();
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.status = "active";
    });
    
  }

  updateRowData(row_obj: any){
    this.loginService.update(row_obj)
    .pipe(first())
    .subscribe(
      (response: any) => { 
        console.log(response);
      },
      (error: any) => { alert(error); }
    );
    this.dataSource.data = this.dataSource.data.filter((user,key)=>{
      if(user.username == row_obj.uid){
        user.username= row_obj.email;
        user.firstname = row_obj.firstname;
        user.lastname = row_obj.lastname;
        user.email = row_obj.email;
        user.password = row_obj.password;
        user.phone = row_obj.phone;
        user.gender = row_obj.gender;
        user.dob = row_obj.dob;
      }
      return true;
    });
  }

  deleteRowData(row_obj: any){
    this.loginService.delete(row_obj.uid)
    .pipe(first())
    .subscribe(
      (response: any) => { 
        console.log(response);
      },
      (error: any) => { alert(error); }
    );
    this.dataSource.data = this.dataSource.data.filter((value,key)=>{
      return value.username != row_obj.uid;
    });
  }


  activeUser(uid: string) {
    if (confirm("Are you sure to active this User?")){
      this.loginService.active(uid)
      .pipe(first())
      //.subscribe(() => this.users = this.users.filter(x => x.uid !== uid))
      .subscribe(
        (response: any) => { 
          console.log(response);
          // this.UsersService.getUsers().then(this.onPromiseSuccess, this.onPromiseError);
          // for (let i =0; i<this.users.length; i++){
          //   if (this.users[i].uid==uid){
          //     this.users.splice(i+1, 1);
          //   }
          // }
        },
        (error: any) => { alert(error); }
      );
      this.table.renderRows();
    }
  } 
}
