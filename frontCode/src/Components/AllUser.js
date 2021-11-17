import React, { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {myConfig} from '../config';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class AllUser extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
          baseUrl:myConfig.baseUrl,
          isLoading:true,
          userOpen:this.props.userOpen,
          shareUserId:'',
          
        };

        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleUserSubmit = this.handleUserSubmit.bind(this);

    }
 handleUserChange(e) {
    console.log(e.target.value)
            
    this.setState({shareUserId: e.target.value});
       
  }

handleUserSubmit(event) {
       console.log(this.state.shareUserId)
        event.preventDefault();
        
        const fd = new FormData();
        fd.append('shareUserId',this.state.shareUserId);
        fd.append('productid',this.state.productid);
        fd.append('owner_id',localStorage.getItem('userdata'));

        axios.post(this.state.baseUrl+'shareproduct',fd,{crossDomain: true})
         .then(function (response) {
            console.log(response.data.status);
            let msg=response.data.message;

          if(response.data.status=='error'){
            NotificationManager.error(msg, 'Error!',3000);

          }else{
            // NotificationManager.success('Product shared successfully', 'Success!',3000);

          }
        }) 
        .catch(function (error) {
          console.log(error);
            NotificationManager.error('Something went wrong', 'Error!',3000);

        });
    }

 
  

render() {
    return (
       <div className=" container" data-switcher-visible>
        <Modal open={this.props.userOpen} onClose={this.props.onCloseUserModal} center>
           <div className="row m-0 p-5">
           <h5>Select User For Share Product</h5>
           <form id="registration" onSubmit={this.handleUserSubmit.bind(this)} >
              <div className="row m-0">
                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <select className="form-control" name="shareUserId"  onChange={this.handleUserChange()}>
                           {this.props.userAllHtml}
                      </select>
                  </div>
                </div>
                
              </div>
              <div className="row m-0 ">
                <div className="col-md-12 col-sm-12 text-right">
                  <div className="form-group">
                    <button className="btn btn-danger mr-2" data-dismiss="modal" onClick={this.props.onCloseUserModal()}> Discard</button>
                    <input type="submit" id="forsub"  className="btn btn-primary save" defaultValue="Save"  onClick={this.props.onCloseUserModal()}/>
                    {/* <input type="submit" name="txt" class="mt-4 btn btn-primary"> */}
                  </div>
                </div>
              </div>
            </form>
           </div>
        </Modal>
        
      </div>
      
    );
  }
}

export default AllUser;
