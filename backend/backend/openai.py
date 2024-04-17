from openai import OpenAI

from .settings import OPENAI_API_KEY


class EventyAI(OpenAI):
    def __init__(self):
        super().__init__(api_key=OPENAI_API_KEY)

    def get_response(self, message: str):
        return self.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "Please optimize the following schedule and return it in the same format. Events with flexible = true can be moved, but events with flexible=false cannot. My preferences are to start my day at 8AM and end at 10PM, group events of a similar category together, and group free time as much as possible.  If events can be better scheduled by splitting them to meet my preferences, please do so:",
                },
                {
                    "role": "user",
                    "content": message,
                },
            ],
            model="gpt-3.5-turbo",
        )
