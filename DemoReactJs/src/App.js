import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';
import firebase from "./firebase";
import { collection, addDoc } from "firebase/firestore"; 
import { getFirestore } from "firebase/firestore";

const ref = firebase.firestore().collection("users");

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        UserArray : [],
        UserArrayFirebase : []
      };
      // Listen to storage event
      window.addEventListener('storage', (e) => this.getAllUserFirebase(e), (e) => this.getAllUser(e));

      this.getAllUserFirebase = this.getAllUserFirebase.bind(this);
      this.getAllUser = this.getAllUser.bind(this);
  }

  componentDidMount() {
    this.getAllUser();
    this.getAllUserFirebase();
  }

  getAllUser(){
    var that = this;
    $.ajax({
      url: "http://localhost:3033/get-all-user",
      dataType: 'json',
      crossDomain: true,
      success: function(data){
        that.setState({ UserArray : JSON.parse(data.UserArray) })
      }
    });
  }

  handlerOpenPopupEdit(UserId, UserName, UserAddress, UserPhone){
    var modal = document.getElementById("myModal");

    var span = document.getElementsByClassName("close")[0];
    document.getElementById("userId").value = UserId;
    document.getElementById("userName").value = UserName;
    document.getElementById("userAddress").value = UserAddress;
    document.getElementById("userPhone").value = UserPhone;
    modal.style.display = "block";

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  handlerEditUser = (event) => {
    event.preventDefault();
    var that = this;
    var content = JSON.stringify({ 'user_id': event.target.elements["userId"].value , 'userName' : event.target.elements["userName"].value, 'userAddress': event.target.elements["userAddress"].value, 'userPhone': event.target.elements["userPhone"].value});
    console.log(content);
    $.ajax({
      type: 'PUT',
      url: "http://localhost:3033/update-user",
      data: content,
      contentType: 'application/json',
      crossDomain: true,
      success: function(data){
        if(data.message == 'success'){
          alert("Update successs");
        }
        else{
          alert("Update failed");
        }
        that.getAllUser();
      }
    });
  }
  handlerAddUser = (event) => {
    event.preventDefault();
    var that = this;
    var content = JSON.stringify({ 'userName' : event.target.elements["userName"].value, 'userAddress': event.target.elements["userAddress"].value, 'userPhone': event.target.elements["userPhone"].value});
    console.log(content);
    $.ajax({
      type: 'POST',
      url: "http://localhost:3033/add-new-user",
      data: content,
      contentType: 'application/json',
      crossDomain: true,
      success: function(data){
        if(data.message == 'success'){
          alert("Add successs");
        }
        else{
          alert("Add failed");
        }
        that.getAllUser();
      }
    });
  }

  handlerDeleteUser(userId) {
    var that = this;
    var content = JSON.stringify({ 'user_id': userId });
    console.log(content);
    $.ajax({
      type: 'DELETE',
      url: "http://localhost:3033/delete-user",
      data: content,
      contentType: 'application/json',
      crossDomain: true,
      success: function(data){
        if(data.message == 'success'){
          alert("Delete successs");
        }
        else{
          alert("Delete failed");
        }
        that.getAllUser();
      }
    });
  }

  //firebase
  getAllUserFirebase(){
    const ref = firebase.firestore().collection("Users");
    ref.onSnapshot((querySnapshot) => {
      const TempUserArrayFirebase = [];
      querySnapshot.forEach((doc) => {
        var TempUserModel = {
          UserAddress : doc.data().UserAddress,
          UserId : doc.id,
          UserName : doc.data().UserName,
          UserPhone : doc.data().UserPhone
        };
        TempUserArrayFirebase.push(TempUserModel);
      })
      this.setState({ UserArrayFirebase : TempUserArrayFirebase });
      console.log(TempUserArrayFirebase);
    })
  }

  handleAddNewUserFirebase = (event) =>{
    event.preventDefault();
    try {
      const docRef = addDoc(collection(getFirestore(), "Users"), {
      UserAddress: event.target.elements["userAddressFB"].value,
      UserName: event.target.elements["userNameFB"].value,
      UserPhone: event.target.elements["userPhoneFB"].value
    });
    console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  handleOpenPopupEditUserFirebase = (UserId, UserName, UserAddress, UserPhone) =>{
    var modal = document.getElementById("myModalFirebase");

    var span = document.getElementsByClassName("close")[1];
    document.getElementById("userIdFB").value = UserId;
    document.getElementById("userNameFB").value = UserName;
    document.getElementById("userAddressFB").value = UserAddress;
    document.getElementById("userPhoneFB").value = UserPhone;
    modal.style.display = "block";

    span.onclick = function() {
      modal.style.display = "none";
    }

    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  handleEditUserFirebase = (event) =>{
    event.preventDefault();
    try {
      var docRef = firebase.firestore().collection("Users").doc(event.target.elements["userIdFB"].value).update({
        UserAddress: event.target.elements["userAddressFB"].value,
        UserName: event.target.elements["userNameFB"].value,
        UserPhone: event.target.elements["userPhoneFB"].value
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  handleDeleteUserFirebase = (userId) => {
    firebase.firestore().collection('Users').doc(userId).delete();
  }

 render() {
    return (
      <div>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <form onSubmit={this.handlerEditUser}>
              <input name="userId" id="userId" type="text" disabled required/>
              <input name="userName" id="userName" type="text" required/>
              <input name="userAddress" id="userAddress" type="text" required/>
              <input name="userPhone" id="userPhone" type="text" required/>
              <input name="submit" type="submit" value="UPDATE" required/>
            </form>
          </div>
        </div>
        <div className="addUser">
          <form onSubmit={this.handlerAddUser}>
            <input name="userName" type="text" placeholder="UserName" required />
            <input name="userAddress" type="text" placeholder="UserAddress" required />
            <input name="userPhone" type="text" placeholder="UserPhone" required />
            <input type="submit" value="ADD" required />
          </form>
        </div>
        <h3>MySQL database</h3>
        <div className="table_contain">
          <table>
          <tbody>
            <tr>
              <th>UserId</th>
              <th>UserName</th>
              <th>UserAddress</th>
              <th>UserPhone</th>
              <th className="action">Action</th>
            </tr>
            {this.state.UserArray.map((numList,i) =>(
                <tr key={numList.userId}>
                  <td>{numList.userId}</td>
                  <td>{numList.userName}</td>
                  <td>{numList.userAddress}</td>
                  <td>{numList.userPhone}</td>
                  <td className="action">
                    <button id="Edit" onClick={() => this.handlerOpenPopupEdit(numList.userId, numList.userName, numList.userAddress, numList.userPhone)}>Edit User</button>
                    <button id="Delete" onClick={() => this.handlerDeleteUser(numList.userId)}>Delete User</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
        <h3>Firebase realtime database</h3>
        <div id="myModalFirebase" className="modal">
          <div className="modal-content">
            <span className="close">&times;</span>
            <form onSubmit={this.handleEditUserFirebase}>
              <input name="userIdFB" id="userIdFB" type="text" disabled required/>
              <input name="userNameFB" id="userNameFB" type="text" required/>
              <input name="userAddressFB" id="userAddressFB" type="text" required/>
              <input name="userPhoneFB" id="userPhoneFB" type="text" required/>
              <input name="submitFB" type="submit" value="UPDATE" required/>
            </form>
          </div>
        </div>
        <div className="addUser">
          <form onSubmit={this.handleAddNewUserFirebase}>
            <input name="userNameFB" placeholder="User name" id="userName" type="text" required/>
            <input name="userAddressFB" placeholder="User address" id="userAddress" type="text" required/>
            <input name="userPhoneFB" placeholder="User phone" id="userPhone" type="text" required/>
            <input name="submitFB" type="submit" value="ADD" required/>
          </form>
        </div>
        <div className="table_contain">
          <table>
          <tbody>
            <tr>
              <th>UserId</th>
              <th>UserName</th>
              <th>UserAddress</th>
              <th>UserPhone</th>
              <th className="action">Action</th>
            </tr>
            {this.state.UserArrayFirebase.map((numList,i) =>(
                <tr key={numList.UserId}>
                  <td>{numList.UserId}</td>
                  <td>{numList.UserName}</td>
                  <td>{numList.UserAddress}</td>
                  <td>{numList.UserPhone}</td>
                  <td className="action">
                    <button id="Edit" onClick={() => this.handleOpenPopupEditUserFirebase(numList.UserId, numList.UserName, numList.UserAddress, numList.UserPhone)}>Edit User</button>
                    <button id="Delete" onClick={() => this.handleDeleteUserFirebase(numList.UserId)}>Delete User</button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } 
}

export default App;
