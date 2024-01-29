fetch('https://script.google.com/macros/s/AKfycbz7jCwb-JcH30BgwxjR85iZYwdGurcxaJZql7sh6yAxQQTcg7c_cK8rxViY-5TVsplo-g/exec')
  .then(response => response.json())
  .then(data => {
    console.log(data); // Process and display your data here
  })
  .catch(error => console.error('Error:', error));
