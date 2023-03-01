import enquireJs from 'enquire.js'

const enquireScreen = function(call) {
  // tablet
  const handler = {
    match: function() {
      call && call('TABLET')
    },
    unmatch: function() {
      call && call('DESKTOP')
    }
  }
  // mobile
  const handler2 = {
    match: () => {
      call && call('MOBILE')
    }
  }
  enquireJs.register('screen and (max-width: 1087.99px)', handler)
  enquireJs.register('screen and (max-width: 767.99px)', handler2)
}

export default enquireScreen
