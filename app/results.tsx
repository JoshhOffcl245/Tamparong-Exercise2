import { useLocalSearchParams, useRouter } from "expo-router"
import { useEffect, useRef } from "react"
import { Animated, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native"

export default function ResultsScreen() {
  const { score, total } = useLocalSearchParams()
  const router = useRouter()
  
  const fadeAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true
      })
    ]).start()
  }, [])

  const scorePercentage = Math.round((Number(score) / Number(total)) * 100)
  
  const getPerformance = () => {
    if (scorePercentage >= 90) return { text: "Outstanding!", emoji: "🏆", color: "#fbbf24" }
    if (scorePercentage >= 80) return { text: "Excellent!", emoji: "🎉", color: "#22c55e" }
    if (scorePercentage >= 70) return { text: "Great Job!", emoji: "⭐", color: "#3b82f6" }
    if (scorePercentage >= 60) return { text: "Good Work!", emoji: "👍", color: "#8b5cf6" }
    return { text: "Keep Trying!", emoji: "💪", color: "#f59e0b" }
  }

  const performance = getPerformance()

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outerContainer}>
        <Animated.View
          style={[
            styles.container,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.emoji}>{performance.emoji}</Text>
            <Text style={styles.title}>Quiz Complete!</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.scoreSection}>
            <View style={[styles.scoreCircle, { borderColor: performance.color }]}>
              <Text style={[styles.percentage, { color: performance.color }]}>
                {scorePercentage}%
              </Text>
            </View>
          </View>

          <View style={styles.scoreDetails}>
            <Text style={styles.scoreLabel}>Your Score</Text>
            <View style={styles.scoreFraction}>
              <Text style={styles.scoreNumber}>{score}</Text>
              <Text style={styles.scoreDivider}>/</Text>
              <Text style={styles.totalNumber}>{total}</Text>
            </View>
            <Text style={styles.correctText}>Correct Answers</Text>
          </View>

          <View style={[styles.messageBox, { borderLeftColor: performance.color }]}>
            <Text style={styles.performanceTitle}>{performance.text}</Text>
            <Text style={styles.message}>
              {scorePercentage >= 80
                ? "You've demonstrated excellent knowledge! Keep up the great work!"
                : scorePercentage >= 60
                ? "Nice progress! Review the questions to improve even more."
                : "Every attempt is a learning opportunity. Keep practicing!"}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{score}</Text>
              <Text style={styles.statLabel}>Correct</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{Number(total) - Number(score)}</Text>
              <Text style={styles.statLabel}>Wrong</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{total}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.retryButton}
              activeOpacity={0.8}
              onPress={() => router.replace("/quiz")}
            >
              <Text style={styles.retryText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.homeButton}
              activeOpacity={0.8}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.homeText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a2e'
  },
  outerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  container: {
    width: '100%',
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30
  },
  header: {
    alignItems: 'center',
    marginBottom: 25
  },
  emoji: {
    fontSize: 60,
    marginBottom: 15
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10
  },
  divider: {
    width: 50,
    height: 3,
    backgroundColor: '#e94560',
    borderRadius: 2
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: 20
  },
  scoreCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f3460'
  },
  percentage: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  scoreDetails: {
    alignItems: 'center',
    marginBottom: 20
  },
  scoreLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
    letterSpacing: 1
  },
  scoreFraction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  scoreNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#e94560'
  },
  scoreDivider: {
    fontSize: 30,
    color: '#475569',
    marginHorizontal: 6
  },
  totalNumber: {
    fontSize: 30,
    color: '#64748b'
  },
  correctText: {
    fontSize: 13,
    color: '#cbd5e1'
  },
  messageBox: {
    width: '100%',
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 4
  },
  performanceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 6
  },
  message: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18
  },
  statsContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
    marginBottom: 20
  },
  statBox: {
    flex: 1,
    backgroundColor: '#0f3460',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center'
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 3
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8'
  },
  buttonContainer: {
    width: '100%',
    gap: 10
  },
  retryButton: {
    width: '100%',
    backgroundColor: '#0f3460',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  retryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#cbd5e1'
  },
  homeButton: {
    width: '100%',
    backgroundColor: '#e94560',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center'
  },
  homeText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})