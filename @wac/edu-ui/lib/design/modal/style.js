"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var supportFlex = true;

if (typeof window !== 'undefined') {
  if (!('flexWrap' in document.documentElement.style)) {
    supportFlex = false;
  }
}

var _default = {
  modal: {
    zIndex: 1051,
    left: 0,
    bottom: 0,
    position: 'fixed',
    width: '100%' // backgroundColor: '#fff'

  },
  mask: {
    position: 'fixed',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'rgba(55, 55, 55, 0.6)',
    height: '100%',
    filter: 'alpha(opacity=50)',
    zIndex: 1052
  },
  maskFadeIn: {
    animation: 'modalMaskFadeIn 0.3s ease-in'
  },
  maskFadeOut: {
    opacity: 0,
    animation: 'modalMaskFadeOut 0.3s ease-in'
  },
  wrap: {
    position: 'fixed',
    overflow: 'visible',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    WebkitTransform: 'translate(-50%, -50%)',
    // animation: 'modalWrapFadeIn 0.3s ease-in',
    zIndex: 1099,
    overflowScrolling: 'touch',
    outline: 0,
    background: '#FFFFFF',
    borderRadius: '1rem',
    width: '27rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wrapFadeOut: {
    opacity: 0,
    animation: 'modalWrapFadeOut 0.3s ease-in'
  },
  wrapFadeIn: {
    animation: 'modalWrapFadeIn 0.3s ease-in'
  },
  title: {
    marginBottom: '1.2rem',
    fontSize: '1.6rem',
    color: '#000000',
    textAlign: 'center'
  },
  content: {
    width: '100%',
    padding: '2.8rem 2.3rem',
    fontSize: '1.4rem',
    color: '#8c8c8c' // lineHeight: '2rem'

  },
  footer: {
    // WebkitBoxFlex: '1',
    // WebkitFlex: '1',
    display: supportFlex ? 'flex' : '-webkit-box',
    WebkitBoxOrient: 'horizontal',
    WebkitBoxDirection: 'normal',
    WebkitFlexDirection: 'row',
    flexDirection: 'row',
    width: '100%',
    height: '4.5rem',
    borderTop: '1px solid #E5E5E5'
  },
  action: {
    WebkitBoxFlex: '1',
    WebkitFlex: '1',
    flex: '1',
    display: supportFlex ? 'flex' : '-webkit-box',
    WebkitBoxOrient: 'horizontal',
    WebkitBoxDirection: 'normal',
    WebkitFlexDirection: 'row',
    flexDirection: 'row',
    WebkitBoxAlign: 'center',
    WebkitAlignItems: 'center',
    alignItems: 'center',
    WebkitBoxPack: 'center',
    WebkitJustifyContent: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #E5E5E5',
    fontSize: '1.7rem',
    color: '#333333'
  },
  actionLast: {
    borderRight: 'none'
  },
  closeBottom: {
    position: 'absolute',
    bottom: '-6rem',
    left: '50%',
    transform: 'translate(-50%)',
    height: '3.2rem',
    width: '3.2rem'
  },
  closeTopRight: {
    position: 'absolute',
    top: '-4rem',
    right: '-1.6rem',
    height: '3.2rem',
    width: '3.2rem'
  }
};
exports.default = _default;