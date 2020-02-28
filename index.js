const { LaboPerformance } =  require('./LaboPerformance')

const WebsitesToTest = [{
    'name': 'Argos',
    'website': 'https://www.google.com'
  },
  {
    'name': 'Myprotein',
    'website': 'https://www.myprotein.com/'
  },
  {
    'name': 'Adidas',
    'website': 'https://www.adidas.co.uk/'
  },
  {
    'name': 'Youtube',
    'website': 'https://www.youtube.com/'
  },
  {
    'name': 'GoogleImagesCats',
    'website': 'https://www.google.com/search?q=cats&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjmqfeUwfHnAhXdUBUIHaTrDmMQ_AUoAXoECBsQAw&biw=1440&bih=766'
  }
]

LaboPerformance('Pouch', WebsitesToTest)

