
## Qualities (in descending order of importance)

* Prevent errors
* Communicate intention
* Reduction of visual noise
* idiomatic LiveScript
* Brevity


## Concrete practices

* Prefer camelCase to hyphen-case. Hyphens create too much visual noise.
* Prefer Ramda to prelude.ls. Functionally they seem on a par. There is a Dash docset for Ramda. Ramda is more likely to be familiar to JS devs. Prelude.ls seems to be LiveScript-only.


## LiveScript

* Only omit commas between arguments if it’s painfully clear that there will be not problem. If in doubt, do not omit. 

	Example of where omitting is okay: `describe 'Test subject' ->`

