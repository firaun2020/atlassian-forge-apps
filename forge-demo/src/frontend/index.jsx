import React, { useEffect, useState } from 'react';
import ForgeReconciler, { Text, Em, Strong, Lozenge, Button, Stack, Inline } from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
  const [data, setData] = useState(null);
  useEffect(() => {
    invoke('getText', { example: 'my-invoke-variable' }).then(setData);
  }, []);

  // TODO: Make Losenge dynamic

  const looksOk = true;
  const showRightBanner = (looksOk) ? "success" : "removed";
  const lorezeTextToShow = (looksOk) ? "PASS" : "FAILED";



  // TODO: Render Lozenege and text design

  return (
    <>
      <Stack>
        <Inline alignBlock='baseline' space='space.100'>
          <Lozenge appearance={showRightBanner}> {lorezeTextToShow} </Lozenge>
          <Text>This doesn't look right</Text>
        </Inline>

        <Inline alignBlock='baseline' space='space.100'>
          <Lozenge appearance='suceess'> YES </Lozenge>
          <Text>This seems OK</Text>
        </Inline>
      </Stack>

    </>

  );

};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);






// import React, { useEffect, useState } from 'react';
// import ForgeReconciler, { Text, Em, Strong, Lozenge, Button, Stack } from '@forge/react';
// import { invoke } from '@forge/bridge';

// const App = () => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     invoke('getText', { example: 'my-invoke-variable' }).then(setData);
//   }, []);
//   return (
//     <>
//       <Text><Em>First Text from FE!</Em></Text>
//       <Text><Strong>{data ? data : 'Loading...'}</Strong></Text>

//       <Stack alignInline='start' space='space.200'>
//         <Lozenge appearance='success'>RISK ANAYLYSIS </Lozenge>
//         <Button> THIS BUTTON </Button>
//       </Stack>

//     </>
//   );
// };

// ForgeReconciler.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );



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
