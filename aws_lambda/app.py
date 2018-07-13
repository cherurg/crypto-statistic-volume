from flask import Flask
import json
from scipy import stats
import base64

app = Flask(__name__)


def response(code, body, type='application/json'):
    return {
        'statusCode': code,
        'headers': {'Content-Type': type},
        'body': body
    }


@app.route('/', methods=['GET', 'POST'])
def lambda_handler(event=None, context=None):
    if event['httpMethod'] == 'GET':
        return response(200, 'It works', 'text/plain')

    data = json.loads(base64.b64decode(event['body']))

    if 'xx' not in data:
        error = json.dumps({'error': 'xx is missing'})
        return response(400, error)

    if 'yy' not in data:
        error = json.dumps({'error': 'yy is missing'})
        return response(400, error)

    if len(data['xx']) != len(data['yy']):
        error = json.dumps({'error': 'len of xx must be equal to len of yy'})
        return response(400, error)

    ks_stats = []
    for x, y in zip(data['xx'], data['yy']):
        ks_stats.append(stats.ks_2samp(x, y))

    return response(200, json.dumps(ks_stats))


if __name__ == '__main__':
    app.run(debug=True)
