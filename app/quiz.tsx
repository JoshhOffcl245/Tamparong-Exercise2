import { useRouter } from "expo-router"
import { useState } from "react"
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { questions } from "./questions"

export default function QuizScreen() {
  const router = useRouter()
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<any[]>(Array(questions.length).fill(null))
  const [fadeAnim] = useState(new Animated.Value(1))
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  const question = questions[current]
  const choices = Object.entries(question.choices)
  const isCheckbox = question.type === "checkbox"

  const selectAnswer = (key: string) => {
    if (isCheckbox) {
      const copy = [...selectedAnswers]
      const index = copy.indexOf(key)
      
      if (index > -1) {
        copy.splice(index, 1)
      } else {
        copy.push(key)
      }
      
      setSelectedAnswers(copy)
      const answersCopy = [...answers]
      answersCopy[current] = copy.length > 0 ? copy : null
      setAnswers(answersCopy)
    } else {
      const copy = [...answers]
      copy[current] = key
      setAnswers(copy)
    }
  }

  const handleNext = (isNext: boolean) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true
    }).start(() => {
      const newIndex = isNext ? current + 1 : current - 1
      setCurrent(newIndex)
      
      const savedAnswer = answers[newIndex]
      if (questions[newIndex].type === "checkbox" && Array.isArray(savedAnswer)) {
        setSelectedAnswers(savedAnswer)
      } else {
        setSelectedAnswers([])
      }
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true
      }).start()
    })
  }

  const finishQuiz = () => {
    let score = 0

    answers.forEach((userAnswer, index) => {
      const correct = questions[index].answer
      if (Array.isArray(correct)) {
        if (
          Array.isArray(userAnswer) &&
          correct.sort().join() === userAnswer.sort().join()
        ) {
          score++
        }
      } else {
        if (userAnswer === correct) score++
      }
    })

    router.push({
      pathname: "/results",
      params: {
        score,
        total: questions.length
      }
    })
  }

  const progressPercentage = ((current + 1) / questions.length) * 100

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercentage}%` }]} />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>
                Question {current + 1}/{questions.length}
              </Text>
              <Text style={styles.progressPercent}>{Math.round(progressPercentage)}%</Text>
            </View>
          </View>

          <Animated.View style={{ opacity: fadeAnim }}>
            {isCheckbox && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>SELECT ALL THAT APPLY</Text>
              </View>
            )}
            
            <Text style={styles.question}>{question.question}</Text>

            <View style={styles.choicesContainer}>
              {choices.map(([key, value]) => {
                const isSelected = isCheckbox 
                  ? selectedAnswers.includes(key)
                  : answers[current] === key

                return (
                  <TouchableOpacity
                    key={key}
                    style={[styles.choice, isSelected && styles.choiceSelected]}
                    activeOpacity={0.7}
                    onPress={() => selectAnswer(key)}
                  >
                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                      {isSelected && <View style={styles.radioDot} />}
                    </View>
                    <View style={styles.choiceTextContainer}>
                      <Text style={styles.choiceKey}>{key}.</Text>
                      <Text style={[styles.choiceText, isSelected && styles.choiceTextSelected]}>
                        {value}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )
              })}
            </View>
          </Animated.View>

          <View style={styles.navigation}>
            <TouchableOpacity
              disabled={current === 0}
              style={[styles.navButton, styles.prevButton, current === 0 && styles.disabledButton]}
              onPress={() => handleNext(false)}
            >
              <Text style={[styles.navText, current === 0 && styles.disabledText]}>
                Previous
              </Text>
            </TouchableOpacity>

            {current === questions.length - 1 ? (
              <TouchableOpacity
                style={[styles.navButton, styles.finishButton]}
                onPress={finishQuiz}
              >
                <Text style={styles.finishText}>Finish</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.navButton, styles.nextButton]}
                onPress={() => handleNext(true)}
              >
                <Text style={styles.nextText}>Next</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e'
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  card: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 25
  },
  progressContainer: {
    marginBottom: 25
  },
  progressBar: {
    height: 8,
    backgroundColor: '#0f3460',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e94560',
    borderRadius: 4
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  progressText: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '600'
  },
  progressPercent: {
    fontSize: 14,
    color: '#e94560',
    fontWeight: 'bold'
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0f3460',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 15
  },
  badgeText: {
    fontSize: 11,
    color: '#e94560',
    fontWeight: 'bold'
  },
  question: {
    fontSize: 22,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 25,
    lineHeight: 30
  },
  choicesContainer: {
    marginBottom: 25
  },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent'
  },
  choiceSelected: {
    borderColor: '#e94560',
    backgroundColor: '#1a1a2e'
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#475569',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioSelected: {
    borderColor: '#e94560'
  },
  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#e94560'
  },
  choiceTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  choiceKey: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e94560',
    marginRight: 8,
    minWidth: 20
  },
  choiceText: {
    fontSize: 16,
    color: '#cbd5e1',
    flex: 1
  },
  choiceTextSelected: {
    color: '#ffffff',
    fontWeight: '600'
  },
  navigation: {
    flexDirection: 'row',
    gap: 12
  },
  navButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center'
  },
  prevButton: {
    backgroundColor: '#0f3460'
  },
  nextButton: {
    backgroundColor: '#e94560'
  },
  finishButton: {
    backgroundColor: '#22c55e'
  },
  disabledButton: {
    opacity: 0.4
  },
  navText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cbd5e1'
  },
  nextText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  finishText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  disabledText: {
    color: '#64748b'
  }
})