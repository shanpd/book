#### 一、union lotto

```python
import warnings
import requests
import pandas as pd
from requests import utils
warnings.filterwarnings("ignore")


# 福彩双色球
def get_union_lotto():
    pd.set_option('expand_frame_repr', False)
    # pd.set_option('display.max_rows', None)

    url = 'https://www.cwl.gov.cn/'
    rsp = requests.get(url)
    headers = requests.utils.dict_from_cookiejar(rsp.cookies)
    cookie = 'HMF_CI=' + headers['HMF_CI']
    headers = {'Cookie': cookie,
               'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                             'Chrome/119.0.0.0 Safari/537.36',
               'Referer': 'https://www.cwl.gov.cn/ygkj/wqkjgg/ssq/'}

    url = 'https://www.cwl.gov.cn/cwl_admin/front/cwlkj/search/kjxx/findDrawNotice'
    params = {'name': 'ssq'}
    rsp = requests.get(url, headers=headers, params=params)
    print("福彩双色球[6 + 1]:code=" + str(rsp.status_code))
    content = pd.DataFrame.from_dict(rsp.json())
    result = pd.DataFrame.from_dict(content['result'].to_dict()).T

    # 红色6个
    red = result['red'].str.split(',')
    red_list = sum(red, [])
    red_dict = {}
    for key in range(1, 34):
        if key < 10:
            value = '0' + str(key)
        else:
            value = str(key)
        red_dict[key] = red_list.count(value)

    result_red_df = pd.DataFrame.from_dict(red_dict, orient='index', columns=['counts'])
    result_red_sort = result_red_df.sort_values(['counts'], ascending=True)
    # print(result_red_sort)
    result_red_index = result_red_sort.index.tolist()

    # 绿色1个
    blue_list = result['blue'].to_list()
    blue_dict = {}
    for key in range(1, 17):
        if key < 10:
            value = '0' + str(key)
        else:
            value = str(key)
        blue_dict[key] = blue_list.count(value)

    result_blue_df = pd.DataFrame.from_dict(blue_dict, orient='index', columns=['counts'])
    result_blue_sort = result_blue_df.sort_values(['counts'], ascending=True)
    # print(result_blue_sort)
    result_blue_index = result_blue_sort.index.tolist()

    # result
    print('最小概率:', end='')
    result_red = result_red_index[0:6]
    result_red.sort(reverse=False)
    result_blue = result_blue_index[:1]
    result_blue.sort(reverse=False)
    print(result_red + result_blue)

    print('中等概率:', end='')
    result_red = result_red_index[14:20]
    result_red.sort(reverse=False)
    result_blue = result_blue_index[7:8]
    result_blue.sort(reverse=False)
    print(result_red + result_blue)

    print('最大概率:', end='')
    result_red = result_red_index[27:]
    result_red.sort(reverse=False)
    result_blue = result_blue_index[15:]
    result_blue.sort(reverse=False)
    print(result_red + result_blue)


if __name__ == '__main__':
    # {01-33:6,01-16:1}
    # 每周二、周四、周日开奖
    # 一等奖（6 + 1）
    # 二等奖（6 + 0）
    # 三等奖（5 + 1）
    # 四等奖（5 + 0，4 + 1）
    # 五等奖（4 + 0，3 + 1）
    # 六等奖 （2 + 1，1 + 1，0 + 1）
    get_union_lotto()

```

#### 二、grand lotto

```python
import warnings
import requests
import pandas as pd
warnings.filterwarnings("ignore")


# 体彩大乐透
def get_grand_lotto():
    pd.set_option('expand_frame_repr', False)
    # pd.set_option('display.max_rows', None)

    url = 'https://webapi.sporttery.cn/gateway/lottery/getHistoryPageListV1.qry'
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                             'Chrome/119.0.0.0 Safari/537.36', 'Referer': 'https://static.sporttery.cn/'}
    params = {'gameNo': 85, 'provinceId': 0, 'pageSize': 5000, 'isVerify': 1, 'pageNo': 1}
    rsp = requests.get(url, headers=headers, params=params)
    print("体彩大乐透[5 + 2]:code=" + str(rsp.status_code))
    df = pd.DataFrame.from_dict(rsp.json())
    values = pd.DataFrame.from_dict(df['value']['list'])

    # 红色的5个
    red = values['lotteryDrawResult'].str[0:14]
    red_list = red.str.split(' ')
    red_list_sum = sum(red_list, [])
    red_dict = {}
    for key in range(1, 36):
        if key < 10:
            value = '0' + str(key)
        else:
            value = str(key)
        red_dict[key] = red_list_sum.count(value)

    result_red_df = pd.DataFrame.from_dict(red_dict, orient='index', columns=['counts'])
    result_red_sort = result_red_df.sort_values(['counts'], ascending=True)
    # print(result_red_sort)
    result_red_index = result_red_sort.index.tolist()

    # 绿色的2个
    blue = values['lotteryDrawResult'].str[15:]
    blue_list = blue.str.split(' ')
    blue_list_sum = sum(blue_list, [])
    blue_dict = {}
    for key in range(1, 13):
        if key < 10:
            value = '0' + str(key)
        else:
            value = str(key)
        blue_dict[key] = blue_list_sum.count(value)

    result_blue_df = pd.DataFrame.from_dict(blue_dict, orient='index', columns=['counts'])
    result_blue_sort = result_blue_df.sort_values(['counts'], ascending=True)
    # print(result_blue_sort)
    result_blue_index = result_blue_sort.index.tolist()

    print('最小概率:', end='')
    result_red = result_red_index[0:5]
    result_red.sort(reverse=False)
    result_blue = result_blue_index[0:2]
    result_blue.sort(reverse=False)
    print(result_red+result_blue)

    print('中等概率:', end='')
    result_red = result_red_index[15:20]
    result_red.sort(reverse=False)
    result_blue = result_blue_index[5:7]
    result_blue.sort(reverse=False)
    print(result_red+result_blue)

    print('最大概率:', end='')
    result_red = result_red_index[30:]
    result_red.sort(reverse=False)
    result_blue = result_blue_index[10:]
    result_blue.sort(reverse=False)
    print(result_red+result_blue)


if __name__ == '__main__':
    # {01-35:5, 01-12:2}
    # 每周一、三、六开奖
    # 一等奖：(5 + 2)
    # 二等奖：(5 + 1)
    # 三等奖：(5 + 0, 4 + 2)
    # 四等奖：(4 + 1, 3 + 2)
    # 五等奖：(4 + 0, 3 + 1, 2 + 2)
    # 六等奖：(3 + 0, 2 + 1, 1 + 2, 0 + 2)
    get_grand_lotto()

```

