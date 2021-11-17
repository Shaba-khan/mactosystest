<?php
class UserData_model extends CI_Model{ 
    function __construct() { 
        // Set table name 
    } 
     
    /* 
     * Fetch user data from the database 
     * @param array filter data based on the passed parameters 
     */ 

    function getdata($user_id) {
    
      $query =  $this->db->select('*')
             ->from('connection')
             ->where('connection.user_id',$user_id)
             ->join('product', 'connection.productId = product.id')
             ->get();

         $result = $query->result_array();
         // print_r($result);die;
        if (!empty($result)) {
            
            return $result;
        } else {
            return false;
        }
}
function getAllUser() {
    
      $query =  $this->db->select('*')
             ->from('user')
             ->get();

         $result = $query->result_array();
         // print_r($result);die;
        if (!empty($result)) {
            
            return $result;
        } else {
            return false;
        }
}
function getUserName($id) {
    
      $query =  $this->db->select('name')
             ->from('user')
             ->where('id',$id)
             ->get();

         $result = $query->result();
         // print_r($result[0]->name);die;
        if (!empty($result)) {
            
            return $result[0]->name;
        } else {
            return false;
        }
}
function getRows($params = array()){ 
        $this->table = 'user'; 

        $this->db->select('*'); 
        $this->db->from($this->table); 
         
        if(array_key_exists("conditions", $params)){ 
            foreach($params['conditions'] as $key => $val){ 
                $this->db->where($key, $val); 
            } 
        } 
         
        if(array_key_exists("returnType",$params) && $params['returnType'] == 'count'){ 
            $result = $this->db->count_all_results(); 
        }else{ 
            if(array_key_exists("id", $params) || $params['returnType'] == 'single'){ 
                if(!empty($params['id'])){ 
                    $this->db->where('id', $params['id']);
               
                } 
                $query = $this->db->get(); 
                $result = $query->row_array(); 
            }else{ 
                $this->db->order_by('id', 'desc'); 
                if(array_key_exists("start",$params) && array_key_exists("limit",$params)){ 
                    $this->db->limit($params['limit'],$params['start']); 
                }elseif(!array_key_exists("start",$params) && array_key_exists("limit",$params)){ 
                    $this->db->limit($params['limit']); 
                } 
                 
                $query = $this->db->get(); 
                $result = ($query->num_rows() > 0)?$query->result_array():FALSE; 
            } 
        } 
         
        // Return fetched data 
        return $result; 
    } 
     
    /* 
     * Insert user data into the database 
     * @param $data data to be inserted 
     */ 
    public function insert($data = array()) { 
        if(!empty($data)){ 
            $this->table = 'user'; 
            $insert = $this->db->insert($this->table, $data); 
            // Return the status 
            return $insert?$this->db->insert_id():false; 
        } 
        return false; 
    }


    public function insert_product($data = array()) { 
        if(!empty($data)){ 
            $this->table = 'product'; 
            $insert = $this->db->insert($this->table, $data); 
            // Return the status 
            $connectiondata=array(
                'productId' => $this->db->insert_id(),
                'user_id' => $data['user_id'],
                'owner_id' => $data['user_id'],
             );
            return $insert?$this->connection($connectiondata):false; 
        } 
        return false; 
    }


    public function connection($data = array()) { 
        if(!empty($data)){ 
            $this->table = 'connection'; 
            $insert = $this->db->insert($this->table, $data); 
            // Return the status 
            return $insert?$this->db->insert_id():false; 
        } 
        return false; 
    }


   
}

?>