---
order: 0
title: 基本用法
---

警告提示，展现需要关注的信息，适用于简短的警告提示。

```js
import { NavigationDraw, Button } from '@oc/design';

function App() {
  const [visible, setVisible] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setVisible(true)} type="primary">
        Open Modal
      </Button>
      <NavigationDraw
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <p>
          You can customize modal body text by the current situation. This modal will be closed
          immediately once you press the OK button.
        </p>
      </NavigationDraw>
    </div>
  );
}

export default App;
```