fetch('https://script.google.com/macros/s/AKfycbxI2y5PAFn4SwiwsXRUMewDd9ewERubWRh9LgZJCMsHp7gmiS8KyeXroF1t3LVhP1ZF/exec')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Process and display your data here
  })
  .catch(error => console.error('Error:', error));
