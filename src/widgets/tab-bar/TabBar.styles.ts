import { colors } from '@/shared';
import { Fonts } from '@/shared/assets/fonts/fonts-config';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  outer: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 0,
    zIndex: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  blurContainer: {
    borderRadius: 32,
    overflow: 'hidden',
    width: '100%',
    minHeight: 64,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  text: {
    fontSize: 10,
    lineHeight: 13,
    color: "#6C6C6C",
    fontFamily: Fonts[700],
    letterSpacing: 0.06,
  },
  isActive: {
    color: colors.blue
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 29,
    paddingVertical: 10,
    width: '100%',
    minHeight: 80,
    borderRadius: 40,
    marginBottom: 8,
    overflow: 'hidden',
  },
  tabButton: {
    display: "flex",
    gap: 6,
    alignItems: 'center',
    minWidth: 60,
  },
  tabText: {
    fontSize: 10,
    lineHeight: 14,
  },
  simpleBar: {
    width: "100%",
    overflow: "hidden",
    justifyContent: 'space-between',
    flexDirection: "row",
    alignItems: "center"
  },
});
