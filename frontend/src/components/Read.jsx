import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
const BASE_URL=process.env.BASE_URL;

const Read = () => {
  const [error, seterror] = useState("")
  const [data, setdata] = useState([]);

  async function GetData(){
    const response = await fetch("http://localhost:5000");

    const result= await response.json();

    if(!response.ok){
      console.log(result.error);
      seterror(result.error);
    }
    if(response.ok){
      setdata(result);    
    }
  }

  const handleDelete= async (id)=>{
    const response=await fetch(`${BASE_URL}/${id}`,{
      method:"DELETE"
    });

    const result=await response.json();

    if(!response.ok){
      console.log(result.error);
      seterror(result.error);
    }
    if(response.ok){
      seterror("Data Deleted SUcccessfully");

      setTimeout(() => {
        seterror("");
        GetData();
      }, 2000);

    }
  }
    useEffect(() => {
     GetData();
    }, []);
    

  return (
    <div className="container my-3">
      {error && <div className="alert alert-danger" >
  {error}
</div>}
      <h2 className="text-center" style={{paddingBottom:20}}>DATA</h2>
      <div className="row">

        {data?.map((ele)=>(
          <div key={ele._id} className="col-3">

          <div className="card">
            <div className="card-header" style={{padding:15}}>DETAILS</div>
            <div className="card-body">
              <h5 className="card-title">{ele.name}</h5>
              <h5 className="card-title">{ele.email}</h5>
              <h5 className="card-title">{ele.age}</h5>
              <p className="card-text">
              </p>
              <Link to={`/${ele._id}`}className="btn btn-primary">UPDATE</Link> &nbsp;&nbsp;&nbsp;
              <Link  className="btn btn-primary" onClick={()=>handleDelete(ele._id)}> DELETE </Link>
            </div>
          </div>
        </div>

        ))}
        
      </div>
    </div>
  );
};

export default Read;
