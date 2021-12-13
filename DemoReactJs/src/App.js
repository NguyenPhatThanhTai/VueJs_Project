import React from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        UserArray : []
      };
  }

  componentDidMount() {
    this.getAllUser();
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
      </div>
    );
  } 
}

export default App;
