import React, { PureComponent } from "react";
import { PointInside } from "./modules/pointinside/Pointinside";

class App extends PureComponent {
  render() {
    return (
      <div>
        <h2>Pointinside</h2>
        <PointInside />
      </div>
    );
  }
}

export default App;
