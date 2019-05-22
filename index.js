let video = document.querySelector('.video')
let canvas = document.createElement('canvas')
let screen = canvas.getContext('2d')
let trainButton = document.querySelectorAll('.train')
let t = 10
let knn = new KNN(784, t)
let i = new Image()
let exampleAdded = false
let counters = document.querySelectorAll('.count')
let rc=0, gc=0, bc=0
//playing video
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function (stream) {
    video.srcObject = stream
    video.play()
  })
}

trainButton[0].onclick = () => {
  rc++
  counters[0].innerHTML = rc
  screen.drawImage(video, 0, 0, canvas.width, canvas.height)
  let url = canvas.toDataURL()
  i.src = url
  addFeature(i, 'red')
}
trainButton[1].onclick = () => {
  gc++
  counters[1].innerHTML = gc
  screen.drawImage(video, 0, 0, canvas.width, canvas.height)
  let url = canvas.toDataURL()
  i.src = url
  addFeature(i, 'green')
}
trainButton[2].onclick = () => {
  bc++
  counters[2].innerHTML = bc
  screen.drawImage(video, 0, 0, canvas.width, canvas.height)
  let url = canvas.toDataURL()
  i.src = url
  addFeature(i, 'blue')
}
function addFeature(i, c){
    knn.addExample(i, c)
}
function startClassification(i){
    let rsl = knn.classify(i)
    if(rsl){
      document.querySelectorAll('.p').forEach(e=>{
        e.style.width = "0%"
      })
      let element = document.querySelector(`.${rsl.label}`)
      let confidence = rsl.confidence
      element.style.width = `${confidence*100}%`
    }
}
setInterval(()=>{
  screen.drawImage(video, 0, 0, canvas.width, canvas.height)
  let url = canvas.toDataURL()
  i.src = url
  if(knn.examples.length>t){
    startClassification(i)
  }else{
    console.log("add more examples")
  }
}, 21)