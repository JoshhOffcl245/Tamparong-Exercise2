import { useRouter } from "expo-router"
import { useEffect, useRef } from "react"
import { Animated, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function HomeScreen() {
  const router = useRouter()
  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true
    }).start()
  }, [])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📝</Text>
        </View>

        <Text style={styles.title}>Code Quiz</Text>
        <Text style={styles.subtitle}>Test Your Programming Knowledge</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.infoNumber}>13</Text>
            <Text style={styles.infoLabel}>Questions</Text>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Multiple choice questions</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Instant results</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Score tracking</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.8}
          onPress={() => router.push("/quiz")}
        >
          <Text style={styles.startButtonText}>Start Quiz</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>Ready to challenge yourself?</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  content: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center'
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#0f3460',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  icon: {
    fontSize: 40
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 30,
    textAlign: 'center'
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
    marginBottom: 30
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#0f3460',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center'
  },
  infoNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 5
  },
  infoLabel: {
    fontSize: 14,
    color: '#94a3b8'
  },
  featuresContainer: {
    width: '100%',
    backgroundColor: '#0f3460',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  bullet: {
    fontSize: 20,
    color: '#e94560',
    marginRight: 10,
    fontWeight: 'bold'
  },
  featureText: {
    fontSize: 15,
    color: '#cbd5e1'
  },
  startButton: {
    backgroundColor: '#e94560',
    width: '100%',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  footer: {
    fontSize: 13,
    color: '#64748b',
    fontStyle: 'italic'
  }
})