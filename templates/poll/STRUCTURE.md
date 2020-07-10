# Poll

## General structure

[id of the poll]/
· ├── info.json · · · · · · · · · · · · · · General infos
· ├── status.json · · · · · · · · · · · · · Current poll status
· ├── grades/ · · · · · · · · · · · · · · · Grades used in this polls
· │ ├── [id of grade 1].json · · · · · · ·· First grade
· │ └── [id of grade 2].json · · · · · · ·· Second grade
· ├── options/ · · · · · · · · · · · · · ·· Options offered to voters
· │ ├── [id of option 1].json · · · · · · · First option
· │ └── [id of option 2].json · · · · · · · Second option
· ├── votes/ · · · · · · · · · · · · · · ·· Votes
· │ ├── [id of voter 1].json · · · · · · ·· Votes of voter 1
· │ └── [id of voter 2].json · · · · · · ·· Votes of voter 2
· └── results/ · · · · · · · · · · · · · ·· Results
· · ├── winner.json · · · · · · · · · · · · Elected option
· · ├── [id of option 1] · · · · · · · · ·· Results for first option
· · | ├── result.json · · · · · · · · · · · Grade and score obtained by first option
· · | └── by-grade.json · · · · · · · · · · Results by grade for first option
· · └── [id of option 2] · · · · · · · · ·· Results for second option
· · · ├── result.json · · · · · · · · · · · Grade and score obtained by second option
· · · └── by-grade.json · · · · · · · · · · Results by grade for second option

## Example of info.json

```
{
    "title": "My poll"
}
```

## Example of status.json

```
{
    "id": "draft",
    "label": "Draft",
}
```

Status id are:

- draft: poll is not published yet
- open: poll is published and participants can vote
- close: votes are closed and results are availables

## Example of grades/[id of grade 1].json

```
{
    "id": "yes",
    "label": "Yes",
    "position": 1
}
```

Grade position order goes from absolute Yes to absolute No
For example : yes, meh, no

## Example of options/[id of option 1].json

```
{
    "id": "blue",
    "label": "Blue",
    "position": 1
}
```

## Example of votes/[id of voter 1].json

```
{
    "blue": "yes",
    "red": "no"
}
```

## Example of results/winner.json

```
{
    "optionId": "blue"
}
```

## Example of results/[id of option 1]/result.json

```
{
    "gradeId": "yes",
    "score": 2
}
```

## Example of results/[id of option 1]/by-grade.json

```
{
    "yes": 2,
    "no": 1
}
```
