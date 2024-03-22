### 再配置の回数

`DynamicSizeArray`に対し、内部的に再配置が行われるのは長さが4を超えた時からである。
pushの回数で考えると、1〜4回は再配置0回、5〜8回は再配置1回、9〜16回は再配置2回、...となる。
よって、`push`の回数n回に対して再配置の回数は $\lfloor \log (n - 1) \rfloor - 1 (n \geq 3)$ である。

### 再配置ごとのコピー回数

コピー回数は、1回目の再配置では4, 2回目の再配置では8, ..., m回目の再配置では $2^{m+1}$ となる。

### 計算量

上記より、`push`をn回したときのコピー回数 $P_n$ は、

$$
\begin{equation}
\begin{split}
P_n &= 4 + 8 + 16 + \cdots + 2^{\lfloor \log (n - 1) \rfloor} \\
&= 4 (2^{\lfloor \log (n - 1) \rfloor - 1} - 1) \\
&= 2^{\lfloor \log (n - 1) \rfloor + 1} - 4
\end{split}
\end{equation}
$$

よって平均計算量 $\overline{P_n}$ は、

$$
\begin{equation}
\overline{P_n} = {P_n \over n} = {2^{\lfloor \log (n - 1) \rfloor + 1} \over n} - {4 \over n}
\end{equation}
$$

$$
\begin{equation}
\overline{P_n} = {2^{\lfloor \log (n - 1) \rfloor + 1} \over n} - {4 \over n} < {2^{\lfloor \log (n - 1) \rfloor + 1} \over n} < {a \cdot 2^{\lfloor \log (n - 1) \rfloor} \over n} < {a \cdot 2^{ \log n } \over n} (a > 0)
\end{equation}
$$

となる。オーダー記法で示すと、

$$
\mathcal{O}(\overline{P_n}) = \mathcal{O}\left({2^{ \log n } \over n}\right) = \mathcal{O}\left(1)\right)
$$

となる。
