import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Em, Strong, Lozenge, Button, Stack } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);
  return (
    <>
      <Text><Em>First Text from FE!</Em></Text>
      <Text><Strong>{data ? data : 'Loading...'}</Strong></Text>

      <Stack alignInline='start' space='space.200'>
        <Lozenge appearance='success'>RISK ANAYLYSIS </Lozenge>
        <Button> THIS BUTTON </Button>
      </Stack>

    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



// EARLIER VERSION

// import React, { useEffect, useState } from 'react';
// import ForgeReconciler, { Text } from '@forge/react';
// import { invoke } from '@forge/bridge';

// const App = () => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     invoke('getText', { example: 'my-invoke-variable' }).then(setData);
//   }, []);
//   return (
//     <>
//       <Text>First Text from FE!</Text>
//       <Text>{data ? data : 'Loading...'}</Text>
//     </>
//   );
// };

// ForgeReconciler.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
