# Architecture

This file can be used to detail:

* Architecture decisions.
* Future implementation details that cannot (or should not!) be attempted in the alotted time.



Date: 13 Oct 2022
# title

Add accessibility to suburb search feature


## Status

Accepted


## Context

It is important to make the website accessible to people have motor disabilities who may only be able to use keyboards. According to [ARIA combobox guide](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
 The keyboard interaction section show the guides that
1. User may use down and up arrow to select suggestion. 
2. User can use Enter key to select the suggestion.


## Decision
The decision was make to use [ariakit](https://ariakit.org/) since implementation is easier than that of [React-aria](https://react-spectrum.adobe.com/react-aria/) and [react-select](https://react-select.com/home).


## Consequences
pros- work can be accomplished in a timely manner.
cons- Compared with React-aria, less documentation and examples are available


## Future implementation details
There are other features that can be implemented, such as text-to-speech. If the user selects specific suburb, the browser will read the relevent context. Library like [react-speech-kit](https://mikeyparton.github.io/react-speech-kit/) could be used for this purpose.