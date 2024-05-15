---
name: BeanzMachine (Bmash)
tools: [Python, Discord, HTML]
image: /docs/assets/images/projects/beanzmachine/bmash-title.jpg
description: Discord social chatbot and web scraping utility.
---

<div class="row">
<div class="col" style="min-width:50%;" markdown="1">
# BeanzMachine (Bmash)
(Chatbot, Web Scraping, Tool)

[ Status: <span style="color:#7C4F9B">Closed Beta</span>. ]

*This project's documentation is currently in development.*
</div>
<div class="col">
</div>
<div class="col" style="max-width:30%;">
{% capture list_items %}
Features
Security
Extra
{% endcapture %}
{% include elements/list.html title="" type="toc" %}
</div>
</div>

<div class="row">
<div class="col">
<img src="/docs/assets/images/projects/beanzmachine/art/bmash-art-1.jpg" alt="Title Image">
</div>
<div class="col">

<div class="row" markdown="1">
<img src="/docs/assets/images/projects/beanzmachine/bmash-beepboop.png" alt="Beep Boop!">

BeanzMachine, often known as Bmash, is a Discord social chatbot and web scraping utility for 
convenient data fetching and interactive entertainment within Discord community servers.
</div>
</div>
</div>

## Feature Overview
How to use BeanzMachine (A.K.A. "bmash"):
Your message MUST contain "bmash"  or be in a dedicated bmash server for BeanzMachine to read it.

#### Some things you can do:
- **[Say hi!](#greetings)**
    Bmash will respond to many common greetings.

- **Make decisions!**
    Enter the options separated by the word "or" or commas and end with "?"
    For example: "bmash qp, mh, or lucioball?"

- **Pick things!**
    Bmash can select any of the following:
    - Numbers
    - Colors
    - Culinary cuisines
    - Animals
    - [Tarot cards](#tarot-readings)
    - [Playing cards](#playing-cards)
    - Magic: The Gathering commander cards
    - Song recommendations (user submitted)
    - Overwatch heroes
    - Valorant agents
    - Inspirational quotes
    - Compliments
    - Fortune cookie fortunes
    - Personality traits
    - Buzzfeed quizzes (trending)
    
    Most selections are supplemented with images. 

- **Get synonyms!**
    Ask for a synonym of a word.

- **Get anagrams!**
    Ask for an anagram of a word.

- **Generate Dungeons & Dragons characters!**
    Ask for a DnD character to generate a full character sheet and backstory.

- **Convert time zones!**
    If your message has a time in it, followed by a time zone, 
    bmash will convert it to all other continental U.S. time zones. 

- **Ask for an inspirational quote!**
    Ask for an "inspiration" or similar word for a random quote.

- **Validate stuff!**
    Use "validate", "confirm", or "verify" in your message for bmash's opinion.

- **Convey a message!**
    Begin your message with "Tell [recipient name here]".

- **Pick an Overwatch/Valorant character!**
    Ask bmash for a hero/agent of any class from either game. 

- **Get a gif!**
    Include "gif" in your message to get a random gif matching your message. 

- **Get a question!**
    Include "question" in your message to get a random question.

- **Play hangman!**
    Say "!hangman" to start a game of hangman!

- **Convert time zones!**
    Enter a time (e.g. 4 pt) for U.S. time zone conversions. 

- **Generate a fantasy name!**
    Ask for a name and optionally specify a length with a digit. 

- **Pick a random number!**
    Roll a dice (e.g. "roll a d20") or ask for a number in a given range.

- **Get a fortune cookie message!**
    Ask for a fortune to find your destiny.

- **Be appreciated!**
    Ask for a compliment and bmash will tell you why you're great.
    
- **Ask Wolfram Alpha!**
    Bmash will look up your question if he doesn't have an answer. 

- **Search Google!**
    Ask Bmash to Google a query and he will return the first result snippet, if found.

- **[Generate memes!](#meme-generation)**
    Use the "!meme" command followed by an image search prompt and a caption in quotes.

- **Summarize websites!**
    Tell bmash to summarize a link to a website and he will do his best to condense its content to about 2000 characters.

- **Identify resistors!**
    Use the "!resistor" command followed by a list of color bands to identify a resistor value.

## Settings


<br>
## Greetings

<div class="row" markdown="1">
<div class="row">
<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/beanzmachine/chats/bmash-greeting-1.png" alt="Greetings">
</div>
</div>
<div class="col" style="min-width:70%; max-width:70%;" markdown="1">
<br>
Bmash will recognize and reply to a large array of greetings from various cultures.

</div>
</div>

</div>

<br>
## Tarot Readings

<div class="row">
<div class="col" style="min-width:90%; max-width:90%;">
<img src="/docs/assets/images/projects/beanzmachine/chats/bmash-tarot-1.png" alt="Tarot">
</div>
<div class="row">
<div class="col" markdown="1">
<br>
Bmash can pick any number of tarot cards from a traditional 78-card tarot deck. 
Cards can be drawn both upright and reversed and the description is selected accordingly.

The appropriate image from the Universal Waite set of tarot artwork is embedded with a colored bar indicating the card's suit.

<br>
Descriptions and images are scraped from [tarot.com]("https://tarot.com/cards")
</div>
<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/beanzmachine/chats/bmash-tarot-mult.png" alt="Multiple Tarot">
</div>
</div>
</div>


</div>

<br>
## Playing Cards

<div class="row">
<div class="col" style="min-width:70%; max-width:70%;" markdown="1">
<br>
Bmash can deal any number of playing cards. 

Single-card draws are accompanied by an embedded image with a colored bar indicating the card's suit.

Multiple-card draws ensure to avoid duplicates.
<br>
<div class="col" style="min-width:60%; max-width:60%;" markdown="1">
<img src="/docs/assets/images/projects/beanzmachine/chats/bmash-card-mult.png" alt="Playing Card">
</div>

</div>
<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/beanzmachine/chats/bmash-card-1.png" alt="Multiple Playing Cards">
</div>
</div>
</div>

<br>
## Meme Generation

<div class="row" markdown="1">
<div class="col" style="min-width:65%; max-width:65%;">
<img src="/docs/assets/images/projects/beanzmachine/chats/bmash-meme-1.png" alt="Meme">
</div>
<div class="col">
<img src="/docs/assets/images/projects/beanzmachine/chats/bmash-meme-3.png" alt="Meme">
</div>
<div class="row">
<div class="col" markdown="1">
<br>
Using Google Image Search web scraping and the Python Pillow library, 
bmash can create memes by searching an image query and rendering user text.

Meme generation complies with the Image Search configuration, filtering AI art, mature content, and embed-incompatible sources.
</div>
<div class="col" markdown="1">
<div class="row">
<img src="/docs/assets/images/projects/beanzmachine/chats/bmash-meme-2.png" alt="Meme">
</div>
</div>
</div>
</div>

## Security

<br>
#### Channel Access
Bmash only parses messages that:
- include `bmash` or `beanzmachine`,
- directly `@mention` Bmash,
- or are sent in a dedicated channel (configured with the `bmash !addchannel` command by a server admin).

#### Message Visibility
- Messages to and from Bmash are never stored.
- Direct messages to and from Bmash are never visible to anyone.
- Messages are never used for training or data collection.

    *Exceptions:*
- Messages to and from Bmash in server channels may be screened during active hours for testing.
- Bug reports and feature suggestions filed with the `!bug` and `!feature` commands are stored in Bmash's server.
- Library additions filed with the `!add[library]` family of commands are stored in Bmash's server.

#### Controlled Output
Bmash's output is not AI-driven or generative. All output is deliberate and screened.<br>
*However, note that online searches are not controlled.*

Bmash also features a blacklist of unsafe topics that he will not engage.

#### Closed Beta
Bmash is currently in a closed beta state. Only screened QA assistants can converse with Bmash.

#### Closed Source
Bmash is closed-source. Bmash's backend is only accessible by its developer (that's me, hi!).

## Extra

#### Bonus Video
My [good friend](https://www.twitch.tv/myoscity) drew their impression of bmash and it makes me very happy <3
{% include elements/video.html id="MWWmJ0Vtcy4" %}

#### Bonus Gallery
{% assign prefix="/docs/assets/images/projects/beanzmachine/art/bmash-art-" -%}
{% assign filetype=".jpg" -%}
{% capture carousel_images %}
{{prefix}}1{{filetype}}
{{prefix}}2{{filetype}}
{% endcapture %}
{% include elements/carousel.html %}