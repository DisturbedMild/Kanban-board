import 'normalize.css';

import { useState } from 'react';

import Header from './components/layout/Header';
import Boards from './components/Boards/Boards';

type NewProject = {
  id: string;
  title: string;
};

const App = () => {
  const [currentProject, setCurrentProject] = useState<NewProject>();
  const initNewProjectHandler = (id: string, title: string) => setCurrentProject({ id, title });

  return <>
    {!currentProject && <>
      <Header initNewProjectHandler={initNewProjectHandler} />
      <h1 className='mt-72 text-5xl text-center uppercase text-neutral-500'>Create New Project</h1>
    </>}
    {currentProject && <Boards projectName={currentProject.title} />}
  </>
}

export default App;
