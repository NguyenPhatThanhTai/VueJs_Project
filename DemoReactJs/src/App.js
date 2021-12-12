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

  handlerEditUser(userId){
    alert(userId);
  }

  handlerDeleteUser(userId) {
    var that = this;
    var content = JSON.stringify({ 'user_id': userId});
    console.log(content);
    $.ajax({
      type: 'DELETE',
      url: "http://localhost:3033/delete-user",
      data: content,
      contentType: 'application/json',
      crossDomain: true,
      success: function(data){
        that.getAllUser();
      }
    });
  }

 render() {
    return (
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
              <tr>
                <td>{numList.userId}</td>
                <td>{numList.userName}</td>
                <td>{numList.userAddress}</td>
                <td>{numList.userPhone}</td>
                <td class="action">
                  <button id="Edit" onClick={() => this.handlerEditUser(numList.userId)}>Edit User</button>
                  <button id="Delete" onClick={() => this.handlerDeleteUser(numList.userId)}>Delete User</button>
                </td>
              </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  } 
}

export default App;
