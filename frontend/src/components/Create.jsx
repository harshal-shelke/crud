import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState();
  const [error, seterror] = useState("");
  const navigate = useNavigate();

  const handleSub = async (e) => {
    e.preventDefault();

    const adduser = { name, email, age };

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(adduser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      seterror(result.error);
    }

    if (response.ok) {
      seterror("");
      setName("");
      setEmail("");
      setAge("");
      navigate("/all");
    }
  };

  return (
    <div className="container ">
      <div className="mb-3">
        {error && <div class="alert alert-danger">{error}</div>}
        <form onSubmit={handleSub}>
          <h1 className="text-center" style={{ height: "100px" }}>
            Enter Details
          </h1>
          <div className="text-center">
            <div className="mb-3 ">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          <input className="btn btn-primary" type="submit" value="Input" />
        </form>
      </div>
    </div>
  );
};

export default Create;
