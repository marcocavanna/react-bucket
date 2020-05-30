import * as React from 'react'

export interface HighlighterProps extends StrictHighlighterProps {
  [key: string]: any
}

export interface StrictHighlighterProps {
  /** An element used to render */
  as?: any,

  /** User defined class */
  className?: string,

  /** Content to show */
  content?: string;

  /** Content to highlight */
  highlight?: string;
}

interface HighlighterComponent extends React.StatelessComponent<HighlighterProps> { }

declare const Highlighter: HighlighterComponent

export default Highlighter
