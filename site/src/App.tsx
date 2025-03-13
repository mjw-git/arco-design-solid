import { ParentComponent } from 'solid-js';
import './App.css';
import './arco.css';
import Icon from './icon';
const App: ParentComponent = props => {
  return (
    <div>
      <div class="ac-navbar-container">
        <a class="ac-navbar-logo">
          <Icon />
        </a>
      </div>
      <div class="ac-content">
        <div class="ac-content-menu"> </div>
        <div class="ac-content-body">{props.children}</div>
        <div class="ac-anchor-layout-holder"></div>
      </div>
    </div>
  );
};
export default App;
