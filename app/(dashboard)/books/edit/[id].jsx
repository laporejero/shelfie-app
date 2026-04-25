import { useEffect, useState } from 'react'
import { StyleSheet, TextInput, Text, TouchableWithoutFeedback, Keyboard, useColorScheme } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useBooks } from '../../../../hooks/useBooks'
import { Colors } from '../../../../constants/Colors'

// themed components
import ThemedView from '../../../../components/ThemedView'
import ThemedButton from '../../../../components/ThemedButton'
import ThemedLoader from '../../../../components/ThemedLoader'
import Spacer from '../../../../components/Spacer'

const EditBook = () => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { fetchBookById, updateBook } = useBooks()

  const [loading, setLoading] = useState(true)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const loadBook = async () => {
      const data = await fetchBookById(id)

      setTitle(data.title)
      setAuthor(data.author)
      setDescription(data.description)

      setLoading(false)
    }

    loadBook()
  }, [id])

  const handleUpdate = async () => {
    await updateBook(id, {
      title,
      author,
      description,
    })

    router.replace(`/books/${id}`)
  }

  if (loading) {
    return (
      <ThemedView safe style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView safe style={styles.container}>
            <Text style={[styles.label, {color: theme.text}]}>Title</Text>
            <TextInput
                value={title}
                onChangeText={setTitle}
                style={[
                    styles.input,
                    { color: theme.text }
                ]}
            />

            <Spacer />

            <Text style={[styles.label, {color: theme.text}]}>Author</Text>
            <TextInput
                value={author}
                onChangeText={setAuthor}
                style={[styles.input, {color: theme.text}]}
            />

            <Spacer />

            <Text style={[styles.label, {color: theme.text}]}>Description</Text>
            <TextInput
                value={description}
                onChangeText={setDescription}
                style={[styles.input, styles.multiline, {color: theme.text}]}
                multiline
            />

            <Spacer height={20} />

            <ThemedButton onPress={handleUpdate}>
                <Text style={{ color: '#fff', textAlign: 'center' }}>
                Save Changes
                </Text>
            </ThemedButton>
        </ThemedView>
    </TouchableWithoutFeedback>
  )
}

export default EditBook

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    padding: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 6,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
})