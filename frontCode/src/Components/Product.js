import React, { Component } from 'react';
import { Link,Redirect } from "react-router-dom";
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {myConfig} from '../config';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

class Product extends React.Component {
  constructor(props) {
        super(props);

        this.state = {
          baseUrl:myConfig.baseUrl,
          open:false,
          Formproduct:{},
          userId:'',
          isLoading:true,
          isUserLoading:true,
          productData:'',
          userOpen:false,
          shareUserId:'',
          productid:'',
          userAllHtml:'',
          alluser:'',
          useName:'',
          imageBaseurl:'http://localhost/api/assets/img/'
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadData = this.loadData.bind(this);

    }
  componentDidMount() {
    console.log(localStorage.getItem('userdata'));
    let userdata=localStorage.getItem('userdata')
    if(typeof userdata=== "undefined" ||  userdata=== null){
       window.location.href="/login";

    }
      this.loadData();

   }
    handleChange(e) {
        var formData = this.state.Formproduct;

        if(event.target.name=='product_image'){
          const fd = new FormData();
            fd.append('product_image',e.target.files[0], e.target.files[0].name);
            axios.post(this.state.baseUrl+'upload', fd,{crossDomain: true}
            ).then(res=>
            {
              // if(res.data!='error'){
            formData['product_image'] = res.data;
            this.setState({Formproduct: formData});
            })

        }else{
            formData[event.target.id] = event.target.value;
            this.setState({Formproduct: formData});
           

        }
       
  }

  handleSubmit(event) {
       console.log(this.state.Formproduct)
        event.preventDefault();

        const fd = new FormData();
        fd.append('product_name',this.state.Formproduct.product_name);
        fd.append('product_discription',this.state.Formproduct.product_discription);
        fd.append('product_image',this.state.Formproduct.product_image);
        fd.append('user_id',localStorage.getItem('userdata'));

        // if (user.name && user.email && user.phone && user.password) {
        axios.post(this.state.baseUrl+'addproduct',fd,{crossDomain: true})
			   .then(function (response) {
			      console.log(response.data.status);
			    	let msg=response.data.message;

			    if(response.data.status=='error'){
                    NotificationManager.error(msg, 'Error!',3000);

			    }else{
              NotificationManager.success('Product Added successfully', 'Success!',3000);
             location.reload();
			    }
			  }) 
			  .catch(function (error) {
			            console.log(error);
                NotificationManager.error('Something went wrong', 'Error!',3000);

			  });
        // }
    }
  onCloseModal(){
      this.setState({open:false});
  }
  onOpenModal(){
      this.setState({open:true});

  }
   onCloseUserModal(){
      this.setState({userOpen:false});
  }
  onOpenUserModal(productid){
      this.setState({userOpen:true});
      this.setState({productid:productid});
      this.getAllUser()
  }
  // share product for user user
   handleUserChange(e) {
    console.log(e.target.value)
            
            this.setState({shareUserId: e.target.value});
       
  }

  handleUserSubmit(event) {
        this.setState({userOpen:false});

        event.preventDefault();

        const fd = new FormData();
        fd.append('shareUserId',this.state.shareUserId);
        fd.append('productid',this.state.productid);
        fd.append('owner_id',localStorage.getItem('userdata'));

        // if (user.name && user.email && user.phone && user.password) {
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
        // }
    }
   
  loadData(){
        const fd = new FormData();
        fd.append('user_id',localStorage.getItem('userdata'));
            this.setState({isLoading:true});
    
    axios.post(this.state.baseUrl+'getdata',fd,{crossDomain: true})
         .then((response) => {
          console.log(response.data.status);
          if(response.data.status=='error'){
            this.setState({isLoading:true});
            
          }else{
            this.setState({isLoading:false});
            let msg=response.data.message;
            let html=[];
            // console.log(this.getUserName(4))
             msg.map((data,i)=>{
              console.log(name)
              
               html.push(
                   <tr key={data.id}>
                    <td><div><img src={this.state.imageBaseurl+data.product_image} width="50" height="50"/></div></td>
                    <td>{data.product_name}</td>
                    <td>{data.product_description}</td>
                    <td>{data.username}</td>

                    <td><button className="btn btn-danger" onClick={this.onOpenUserModal.bind(this,data.id)}>Share user</button></td>
                   </tr>
                )
               });
            this.setState({productData:html})
            
          }
        }).catch((e) => 
          {
          console.log(e);

        });
  }
getAllUser(){

  let html=[];
   
     axios.get(this.state.baseUrl+'getAllUser',{crossDomain: true})
         .then((response) => {
          console.log(response.data.status);
          if(response.data.status=='error'){
            this.setState({isUserLoading:true});
            
          }else{
            this.setState({alluser:response.data.message})
            response.data.message.map((data,i)=>{
                console.log(data)
                if(data.id!=localStorage.getItem('userdata')){
                     html.push(
                         <option value={data.id} key={data.id} >{data.name}</option>
                      )
                  }

                });
            this.setState({isUserLoading:false});

          }
        }).catch((e) => 
          {
          console.log(e);

        });
   this.setState({userAllHtml:html})
            
}
getUserName(id){
    const fd = new FormData();
    fd.append('id',id);
    let usename='-';
    axios.post(this.state.baseUrl+'getUserName',fd,{crossDomain: true})
         .then((response) => {
          console.log(response.data.message);
          if(response.data.status=='error'){
            this.setState({isUserLoading:true});
          }else{
            usename=response.data.message.name;
            this.setState({useName:response.data.message.name})
          }
        }).catch((e) => 
          {
          console.log(e);

        });
        return usename;
}
render() {
    return (
       <div className=" container" data-switcher-visible>
        {/* Form section */}
      <NotificationContainer/>
       
       <div className="row m-0" >
         <div className="col-md-10 mt-5 text-right mx-auto">
            <div className="shadow">
              <button className="btn btn-primary" onClick={this.onOpenModal.bind(this)}>Add Product</button>
          </div>
          </div>

         <div className="col-md-10 mt-5 mx-auto">
           
        
         { this.state.isLoading ? (
            <p>Loading ...</p>
             ) :
            <div className="shadow">
          <h4 className="text-left mb-5 mt-5 "> Product List</h4>

             <table className='table'>
             <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Discription</th>
                <th>Uoploaded By</th>
                <th>Quantity</th>
              </tr>
             </thead>
              <tbody>
               {this.state.productData}

              </tbody>
          </table>
          </div>
             }
          </div>
        </div>
        <Modal open={this.state.open} onClose={this.onCloseModal.bind(this)} center>
           <div className="row m-0">
           <form id="registration" onSubmit={this.handleSubmit.bind(this)} >
              <div className="row m-0">
                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="product_name" className>Product Name</label>
                    <input id="product_name" type="text" 
                        name="product_name"
                       placeholder="Product name" 
                       className="form-control" 
                       required="required" 
                       onChange={this.handleChange}
                     />
                  </div>
                </div>
                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="product_image" className>Product Image</label>
                    <input id="product_image"
                           type="file" 
                           name="product_image"  
                           className="form-control" 
                           onChange={this.handleChange}

                           />

                  </div>
                </div>
                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="product_discription" className>Product Discription</label>
                    <input id="product_discription" 
                           type="text" 
                           name="product_discription" 
                           placeholder="Enter Discription" 
                           className="form-control" 
                           required="required"
                           onChange={this.handleChange}
                            />
                  </div>
                </div>
                
              </div>
              <div className="row m-0 ">
                <div className="col-md-12 col-sm-12 text-right">
                  <div className="form-group">
                    <button className="btn btn-danger mr-2" data-dismiss="modal" onClick={this.onCloseModal.bind(this)}> Discard</button>
                    <input type="submit" id="forsub"  className="btn btn-primary save" defaultValue="Save" onClick={this.onOpenModal.bind(this)} />
                    {/* <input type="submit" name="txt" class="mt-4 btn btn-primary"> */}
                  </div>
                </div>
              </div>
            </form>
           </div>
        </Modal>
        <Modal open={this.state.userOpen} onClose={this.onCloseUserModal.bind(this)} center>
           <div className="row m-0 p-5">
           <div className="pd mx-auto">
           <h5 className="mb-5 mt-5">Select User For Share Product</h5>
           <form id="registration" onSubmit={this.handleUserSubmit.bind(this)} >
              <div className="row m-0">
                <div className="col-md-12 col-sm-12">
                  <div className="form-group">
                    <select className="form-control" name="shareUserId"  onChange={this.handleUserChange}>
                           {
                            this.state.isUserLoading ?
                            (<p>Loading ...</p>):
                            this.state.userAllHtml
                           }
                      </select>
                  </div>
                </div>
                
              </div>
              <div className="row m-0 ">
                <div className="col-md-12 col-sm-12 text-right">
                  <div className="form-group">
                    <button className="btn btn-danger mr-2" data-dismiss="modal" onClick={this.onCloseUserModal.bind(this)}> Discard</button>
                    <input type="submit" id="forsub"  className="btn btn-primary save" defaultValue="Save"  />
                    {/* <input type="submit" name="txt" class="mt-4 btn btn-primary"> */}
                  </div>
                </div>
              </div>
            </form>
            </div>
           </div>
        </Modal>
        
      </div>
      
    );
  }
}

export default Product;
