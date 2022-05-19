
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';
import axios from 'axios';
import './app.css';

function App() {

  const [tasksTitle, setTasksTitle] = useState(null);
  const [tasksDescription, setTasksDescription] = useState(null);
  const [tasksId, setTasksId] = useState(null);

  const [getResult, setGetResult] = useState(null);

  const [postResult, setPostResult] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const [postDescription, setPostDescription] = useState('');

  const [putResult, setPutResult] = useState(null);
  const [putId, setPutId] = useState('');
  const [putTitle, setPutTitle] = useState('');
  const [putDescription, setPutDescription] = useState('');
  
  const [deleteResult, setDeleteResult] = useState(null);
  const [deleteId, setDeleteId] = useState('');

  const getTitle = () => {
    axios.get('http://localhost:1337/api/tasks')
    .then((result) => {
      setTasksTitle(
        result.data.data.map((task) => {
          return <li>{task.attributes.title}</li>;
        })
      );

      setGetResult(JSON.stringify(result.data.data, null, 2));
    });
  };

  const getDescription = () => {
    axios.get('http://localhost:1337/api/tasks')
    .then((result) => {
      setTasksDescription(
        result.data.data.map((task) => {
          return <li>{task.attributes.descriptions}</li>;
        })
      );

      setGetResult(JSON.stringify(result.data.data, null, 2));
    });
  };

  const getId = () => {
    axios.get('http://localhost:1337/api/tasks')
    .then((result) => {
      setTasksId(
        result.data.data.map((task) => {
          return <li key={task.id}>{task.attributes.id}</li>;
        })
      );

      setGetResult(JSON.stringify(result.data.data, null, 2));
    });
  };

  const clearGetOutput = () => {
    setTasksTitle(null);
    setTasksDescription('');
    setGetResult(null);
  };


  const postData = () => {
    axios.post('http://localhost:1337/api/tasks', {
        data: {
          title: postTitle,
          descriptions: postDescription,
        },
      })
      .then((result) => {
        setPostResult(JSON.stringify(result.data.data, null, 2));
      });
    };

  const clearPostOutput = () => {
    setPostTitle('');
    setPostDescription('');
    setPostResult(null);
  };

  const putData = () => {
    axios
      .put(`http://localhost:1337/api/tasks/${putId}`, {
        data: {
          title: putTitle,
          descriptions: putDescription,
        },
      })
      .then((result) => {
        setPutResult(JSON.stringify(result.data.data, null, 2));
      });
  };

  const clearPutOutput = () => {
    setPutId('');
    setPutTitle('');
    setPutDescription('');
    setPutResult(null);
  };

  const deleteDataById = () => {
    axios
      .delete(`http://localhost:1337/api/tasks/${deleteId}`)
      .then((result) => {
        setDeleteResult(JSON.stringify(result.data.data, null, 2));
      });
  };

  const clearDeleteOutput = () => {
    setDeleteId('');
    setDeleteResult(null);
  };

  return (
    <body >
    <div style={{width: 1900 }}>
    <div className="row">
      <div className="col-4">
        <section className="vh-100" >
          <div className="container py-5 h-100" >
            <div className="row d-flex justify-content-center align-items-center h-100" >
              <div className="card rounded-3" style={{backgroundColor: '#F0F8FF'}}>
                <div className="card-body p-4">
                <h4 className="text-center my-3 pb-3">Lista zadań</h4>
                  <div className="row">
                    <div className="col-5">
                      <button type="submit" className="btn btn-primary" onClick={getTitle}>Pokaż zadania</button>
                      <b><ol>{tasksTitle}</ol></b>
                    </div>
                    <div className="col-5">
                      <button type="submit" className="btn btn-primary" onClick={getDescription}>Pokaż opisy</button>
                      <b>{tasksDescription}</b>
                    </div>
                    <div className="col-2">
                    <button type="submit" className="btn btn-warning" onClick={clearGetOutput}>Wyczyść</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="col-8">
        <section className="vh-100">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="card rounded-3" style={{backgroundColor: '#F0F8FF'}}>
                <div className="card-body p-4">
                <div className="row">
                  <div className="col-4">
        
                  <h4 className="text-center my-3 pb-3">Dodaj zadanie</h4>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tytuł"
                        onChange={(e) => setPostTitle(e.target.value)}
                        value={postTitle}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Opis"
                        onChange={(e) => setPostDescription(e.target.value)}
                        value={postDescription}
                      />
                    </div>
                  <div className="row">
                  <div className="col-3">
                  <button type="submit" className="btn btn-primary" onClick={postData}>Dodaj</button>
                  </div>
                  <div className="col-3">
                  <button type="submit" className="btn btn-warning" onClick={clearPostOutput}>Wyczyść</button>
                  </div>
                  </div>
                  <div className="alert alert-secondary mt-2" role="alert">
                  <pre>{postResult}</pre>
                  </div>     
                        
                  
                    </div>
                    <div className="col-4">
                  
                    <h4 className="text-center my-3 pb-3">Zmień zadanie</h4>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Id"
                        onChange={(e) => setPutId(e.target.value)}
                        value={putId}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Tytuł"
                        onChange={(e) => setPutTitle(e.target.value)}
                        value={putTitle}
                      />
                    </div>
                    <div className="mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Opis"
                        onChange={(e) => setPutDescription(e.target.value)}
                        value={putDescription}
                      />
                    </div>

                  <div className="row">
                  <div className="col-3">
                  <button type="submit" className="btn btn-primary" onClick={putData}>Zmień</button>
                  </div>
                  <div className="col-3">
                  <button type="submit" className="btn btn-warning" onClick={clearPutOutput}>Wyczyść</button>
                  </div>
                  </div>
                  <div className="alert alert-secondary mt-2" role="alert">
                    <pre>{putResult}</pre>
                  </div>
                          
                    
                  
                    </div>
                    <div className="col-4">
                  
                    <h4 className="text-center my-3 pb-3">Usuń zadanie</h4>
                    <div className="mb-3">
                      <input
                      type="text"
                      className="form-control"
                      placeholder="Id"
                      onChange={(e) => setDeleteId(e.target.value)}
                      value={deleteId}
                      />
                    </div>
                  <div className="row">
                  <div className="col-3">
                  <button type="submit" className="btn btn-primary" onClick={deleteDataById}>Usuń</button>
                  </div>
                  <div className="col-3">
                  <button type="submit" className="btn btn-warning" onClick={clearDeleteOutput}>Wyczyść</button>
                  </div>
                  </div>
                  <div className="alert alert-secondary mt-2" role="alert">
                    <pre>{deleteResult}</pre>
                  </div>     
                          
                    
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        

    </div>
    </div>
    </div>
    </body>
  );
}

export default App;
