import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { App } from 'antd';
import Designer from '../views/Designer';

export default function Main() {
  return (
    <App>
      <Router>
        <Routes>
          <Route path="/" element={<Designer />} />
        </Routes>
      </Router>
    </App>
  );
}
