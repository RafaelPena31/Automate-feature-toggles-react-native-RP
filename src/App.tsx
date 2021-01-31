import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import Rox from 'rox-react-native'

const App = () => {
  const [title, setTitle] = useState(false)
  const [text, setText] = useState(false)
  const [color, setColor] = useState('black')
  const PROD = false

  const key = PROD ? 'YOUR_PROD_KEY' : 'YOUR_STAGING_KEY'

  const roxFlags = {
    title: new Rox.Flag(),
    text: new Rox.Flag(),
    titleColor: new Rox.RoxString('black', ['black', 'yellow', 'red'])
  }

  const configurationFetchedHandler = () => {
    setTitle(roxFlags.title.isEnabled())
    setText(roxFlags.text.isEnabled())
    setColor(roxFlags.titleColor.getValue())
  }

  const options = {
    configurationFetchedHandler: configurationFetchedHandler
  }

  const InitRox = useCallback(async () => {
    Rox.setCustomStringProperty('environmentType', PROD ? 'Production' : 'Staging')

    Rox.register('', roxFlags)
    await Rox.setup(key, options)
  }, [PROD, key, roxFlags, options])

  useEffect(() => {
    InitRox().then(() => console.log('ROX ON'))
  }, [InitRox])

  return (
    <>
      <StatusBar barStyle='light-content' />
      <SafeAreaView>
        <Text style={styles.principalTitle}>Welcome to the Feature Toggle integration</Text>
        {title && <Text style={[styles.title, { color: color }]}>Hello, I&apos;m a title!</Text>}
        {/* Print: "Hello, I'm a title!" */}

        <View>
          {text && <Text style={styles.text}>Hello, I&apos;m a text!</Text>}
          {/* Print: "Hello, I'm a text!" */}
        </View>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  principalTitle: {
    fontSize: 35,
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  title: {
    fontSize: 35,
    fontFamily: 'Helvetica',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 18,
    fontFamily: 'Helvetica'
  }
})

export default App
