import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import Animated, { Easing, useAnimatedStyle, withSpring, withDelay, useSharedValue } from 'react-native-reanimated';
import { GestureHandlerRootView, GestureDetector, Gesture, GestureHandler } from 'react-native-gesture-handler';
import { Svg, Rect, Circle } from 'react-native-svg';

// Screen dimensions
const { width, height } = Dimensions.get('window');

// Shooter Game Component
const ShooterGame = () => {
  const [projectiles, setProjectiles] = useState([]); // Track all projectiles
  const [enemies, setEnemies] = useState([]); // Track all enemies
  const shooterX = useSharedValue(width / 2);
  const shooterY = useSharedValue(height - 100);
  const [score, setScore] = useState(0);

  // Handle Shooter Movement
  const gestureHandler = Gesture.Pan()
    .onUpdate((event) => {
      shooterX.value = Math.min(Math.max(event.translationX, 0), width);
    });

  const animatedShooterStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shooterX.value }],
  }));

  // Handle Shooting Projectiles
  const shootProjectile = () => {
    const newProjectile = {
      x: shooterX.value,
      y: shooterY.value,
    };

    setProjectiles((prevProjectiles) => [...prevProjectiles, newProjectile]);

    // Animate projectile
    const animateProjectile = () => {
      newProjectile.y -= 5;
      setProjectiles((prev) =>
        prev.map((p) =>
          p === newProjectile ? { ...p, y: newProjectile.y } : p
        )
      );
    };

    const projectileInterval = setInterval(animateProjectile, 10);

    // Stop animation when projectile moves off-screen
    setTimeout(() => clearInterval(projectileInterval), 2000);
  };

  // Handle Enemy Creation and Movement
  useEffect(() => {
    const enemyInterval = setInterval(() => {
      const newEnemy = {
        x: Math.random() * width,
        y: -50,
      };
      setEnemies((prevEnemies) => [...prevEnemies, newEnemy]);

      // Animate enemies moving down
      const animateEnemy = () => {
        newEnemy.y += 2;
        setEnemies((prev) =>
          prev.map((e) => (e === newEnemy ? { ...e, y: newEnemy.y } : e))
        );
      };

      const enemyMovementInterval = setInterval(animateEnemy, 20);

      // Stop animation when enemy moves off-screen
      setTimeout(() => clearInterval(enemyMovementInterval), 5000);
    }, 1500);

    return () => clearInterval(enemyInterval);
  }, []);

  // Handle Collision Detection
  useEffect(() => {
    const checkCollisions = () => {
      setProjectiles((prevProjectiles) =>
        prevProjectiles.filter((projectile) => {
          const collision = enemies.some((enemy) => {
            // Check for collision between projectiles and enemies
            const distance = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
            if (distance < 40) {
              setEnemies((prevEnemies) => prevEnemies.filter((e) => e !== enemy));
              setScore((prevScore) => prevScore + 1); // Increase score on hit
              return true;
            }
            return false;
          });

          return !collision; // Remove projectile if it hits an enemy
        })
      );
    };

    const collisionInterval = setInterval(checkCollisions, 50);
    return () => clearInterval(collisionInterval);
  }, [projectiles, enemies]);

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={gestureHandler}>
        <Animated.View style={[styles.shooter, animatedShooterStyle]}>
          <Svg height="50" width="50">
            <Rect x="0" y="0" width="50" height="50" fill="blue" />
          </Svg>
        </Animated.View>
      </GestureDetector>

      <Text style={styles.scoreText}>Score: {score}</Text>

      {/* Projectiles */}
      {projectiles.map((projectile, index) => (
        <Svg key={index} height="10" width="10" style={{ position: 'absolute', left: projectile.x - 5, top: projectile.y - 20 }}>
          <Circle cx="5" cy="5" r="5" fill="red" />
        </Svg>
      ))}

      {/* Enemies */}
      {enemies.map((enemy, index) => (
        <Svg key={index} height="30" width="30" style={{ position: 'absolute', left: enemy.x - 15, top: enemy.y - 15 }}>
          <Circle cx="15" cy="15" r="15" fill="green" />
        </Svg>
      ))}

      {/* Shoot button */}
      <Animated.View style={styles.shootButtonContainer}>
        <Text style={styles.shootButtonText} onPress={shootProjectile}>SHOOT</Text>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shooter: {
    position: 'absolute',
    bottom: 100,
    left: width / 2 - 25,
  },
  scoreText: {
    position: 'absolute',
    top: 40,
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  shootButtonContainer: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 10,
  },
  shootButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ShooterGame;
