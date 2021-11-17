<?php
header('Access-Control-Allow-Origin: abc');

defined('BASEPATH') OR exit('No direct script access allowed');

class Home extends CI_Controller {
 function __construct() { 
        parent::__construct(); 
         $data=array();
           
        // Load form validation library & user model 
        $this->load->library('form_validation'); 
        
        $this->load->library('image_lib');
        // User login status 
        $this->load->model('Employee_model');
        $this->load->model('UserData_model');

         
    } 
  public function index()
	{
        $data=array();
       
        

	}
    public function getdata()
    {
        $data=array();
        $response=array();
        $id=$this->input->post('user_id');
        $data = $this->UserData_model->getdata($id); 
        if($data){
             $response['message']=$data;
             $response['status']='done';
        }else{
             $response['message']='Something Went Wrong';
             $response['status']='error';
        }
        print_r(json_encode($response));
       

    }
    public function getAllUser()
    {
        $data=array();
        $response=array();
       
        $data = $this->UserData_model->getAllUser(); 
        if($data){
             $response['message']=$data;
             $response['status']='done';
        }else{
             $response['message']='Something Went Wrong';
             $response['status']='error';
        }
        print_r(json_encode($response));
       

    }
 public function addproduct(){
 	// print_r($_POST);
 	if(!empty($_POST)){
        $username= $this->getUserName($this->input->post('user_id'));
        // print_r($username);die;
        $details = array(
        	'product_name'=>$this->input->post('product_name'),
        	'product_image'=>$this->input->post('product_image'),
        	'product_description'=>$this->input->post('product_discription'),
        	'user_id'=>$this->input->post('user_id'),
            'username'=>$username

        ); 
        $insert1 = $this->UserData_model->insert_product($details); 
            
            if($insert1){
              print_r($insert1);
            }else{
              print_r($insert1);

            }
            
         }
      
 	
 }
 public function registration(){ 
     // print_r($_POST);
     if(!empty($_POST)){ 
            $this->form_validation->set_rules('name', 'name', 'required'); 
            $this->form_validation->set_rules('email', 'Email', 'required|valid_email|callback_email_check'); 
            $this->form_validation->set_rules('password', 'password', 'required');
            $this->form_validation->set_rules('phone', 'phone', 'required'); 
            
            $userData = array( 
                'name' => strip_tags($this->input->post('name')), 
                'email' => strip_tags($this->input->post('email')), 
                'password' => md5($this->input->post('password')), 
                'phone' => md5($this->input->post('phone')), 

            ); 
           
            if($this->form_validation->run() == true){ 
        // print_r($userData);die("p");
                $response=array();
                $insert = $this->UserData_model->insert($userData); 
                if($insert){  
                   $response['message']=$insert;
                   $response['status']='Done';
                }else{ 
                    $response['message']='Something Went Wrong';
                    $response['status']='error';
                   
               }
                    print_r(json_encode($response));

            }else{ 
                    $response['message']='The given email already exists.';
                    $response['status']='error';
                    print_r(json_encode($response));
                   
                   

               }

        } 
        

 }
 public function login(){ 
        $response = array(); 
         
             
        // If login request submitted 
        if(!empty($_POST)){ 
            $this->form_validation->set_rules('email', 'Email', 'required|valid_email'); 
            $this->form_validation->set_rules('password', 'password', 'required'); 
             
            if($this->form_validation->run() == true){ 
                $con = array( 
                    'returnType' => 'single', 
                    'conditions' => array( 
                        'email'=> $this->input->post('email'), 
                        'password' => md5($this->input->post('password')), 
                        
                    ) 
                ); 
                $checkLogin1 = $this->UserData_model->getRows($con); 
                // print_r($trial);die();
                if($checkLogin1){ 
                    $response['message']=$checkLogin1;
                    $response['status']='Done';
                }else{ 
                    $response['message']='Invalid Details';
                    $response['status']='error';
                } 
                    print_r(json_encode($response));

             }else{ 
                    $response['message']='Something Went Wrong';
                    $response['status']='error';
                    print_r(json_encode($response));
                   
                   

               } 
         }
        
        // $this->load->view('include/footer'); 
    }
 public function email_check($str){ 
        $con = array( 
            'returnType' => 'count', 
            'conditions' => array( 
                'email' => $str 
            ) 
        ); 
        $checkEmail = $this->UserData_model->getRows($con); 
        if($checkEmail > 0){ 
            // $this->form_validation->set_message('email_check', 'The given email already exists.'); 
            // $this->session->set_flashdata('error', "The given email already exists.");
            return FALSE; 
        }else{ 
            return TRUE; 
        } 
    }

 public function upload(){

            if(!empty($_FILES['product_image']['name']))
                   {
                      $name = $_FILES['product_image']['name'];
                      $exp=explode('.', $name);
                      $ext=end($exp);
                      $newname =  strtolower($exp[0]).'_'.time().".".$ext; 
                      $target_dir = "assets/img/";
                      $target_file = $target_dir . basename($newname);

                      // Select file type
                      $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

                      // Valid file extensions
                      $extensions_arr = array("jpg","jpeg","png","gif");

                      // Check extension
                      if( in_array($imageFileType,$extensions_arr) ){
                     
                         move_uploaded_file($_FILES['product_image']['tmp_name'],$target_dir.$newname);

                      }
                 }else{
                  $newname='default.png';
                 }
                 print_r($newname);
  }	
public function shareproduct(){
    if(!empty($_POST)){
     $response=array();   
     $con = array(
                'productId' =>$this->input->post('productid'),
                'user_id' => $this->input->post('shareUserId'),
                'owner_id' => $this->input->post('owner_id'),
             ); 
    $check = $this->UserData_model->connection($con); 
    // print_r($trial);die();
    if($check){ 
        $response['message']=$check;
        $response['status']='Done';
    }else{ 
        $response['message']='Invalid Details';
        $response['status']='error';
    } 
        print_r(json_encode($response));
    }

}
public function getUserName($id){
    // print_r($_POST);die;
    $check = $this->UserData_model->getUserName($id); 
    // print_r($trial);die();
    if($check){ 
        $response['message']=$check;
        $response['status']='Done';
    }else{ 
        $response['message']='-';
        $response['status']='error';
    } 
    return json_encode($check);
        print_r(json_encode($response));
    
}
}
