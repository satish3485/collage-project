module.exports = {
  'Exercise 5 test Album' : function (client) {
    client
      .url('http://localhost:3000/albums/5625fc2ad12b84d23d1c7bd5/edit/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[name=name]')
      .assert.visible('input[name=artist]')
      .assert.visible('input[name=artwork]')
      .assert.visible('input[name=dateCreated]')
      .clearValue('input[name=name]')
      .setValue('input[name=name]', 'Awakening Resolution')
      .pause(1000)
      .waitForElementVisible('button[name=updateResource]', 1000)
      .click('button[name=updateResource]')
      .pause(1000)
      .url('http://localhost:3000/albums/5625fc2ad12b84d23d1c7bd5/edit/')
      .waitForElementVisible('body', 1000)
      .assert.visible('input[name=name]')
      .assert.visible('input[name=artist]')
      .assert.visible('input[name=artwork]')
      .assert.visible('input[name=dateCreated]')
      .assert.value("input[name=name]", "Awakening Resolution")
      .end();
  }
};